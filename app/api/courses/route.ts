import puppeteer from "puppeteer";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let browser;
  try {
    // Parse request body
    const body = await request.json().catch(() => null);
    if (!body || !body.name) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid request body", 
          message: "Course name is required" 
        }), 
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // ✅ Extract course name
    let courseName = body.name as string;
    
    // Launch browser
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to course search
    try {
      await page.goto(
        `https://selfservice.kean.edu/Student/Courses/Search?keyword=${courseName}`,
        { 
          waitUntil: "domcontentloaded",
          timeout: 30000 
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          error: "Navigation failed", 
          message: "Failed to access course search page" 
        }), 
        { 
          status: 503,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Wait for initial content
    try {
      await page.waitForSelector('ul[data-bind="foreach: SubjectsPartialList"]', { timeout: 10000 });
      await page.waitForSelector("ul#course-resultul", { timeout: 10000 });
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          error: "Course not found", 
          message: `No results found for course: ${courseName}` 
        }), 
        { 
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Check if course exists and is rendered
    const courseExists = await page.evaluate(() => {
      const courses = document.querySelectorAll("#course-resultul > li");
      return courses.length > 0;
    });

    if (!courseExists) {
      return new Response(
        JSON.stringify({ 
          error: "Course not found", 
          message: `No results found for course: ${courseName}` 
        }), 
        { 
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // ✅ Ensure at least one course is fully rendered
    await page.waitForFunction(
      () => {
        const courses = document.querySelectorAll(
          "#course-resultul > li:nth-child(1) span[data-bind]"
        );
        const coursesDescription = document.querySelectorAll(
            "#course-resultul > li:nth-child(1) .search-coursedescription"
        ); 
        return courses.length > 0 && courses[0]?.textContent?.trim()?.length > 0;
      },
      { timeout: 60000 }
    );

    // ✅ Extract course details (name and description)
    const courseDetails = await page.evaluate((searchQuery) => {
        const courseElement = document.querySelector("#course-resultul > li:nth-child(1) span[data-bind]");
        const name = courseElement?.textContent?.trim();
        const description = document.querySelector("#course-resultul > li:nth-child(1) .search-coursedescription")?.textContent?.trim();
        
        // Extract course code from the full course name (handle both space and * separator)
        const courseCodeMatch = name?.match(/([A-Z]+)[\s\*](\d+)/i);
        if (!courseCodeMatch) return null;
        
        const [_, prefix, number] = courseCodeMatch;
        
        // Clean up search query to match format (remove '+' and convert to uppercase)
        const cleanSearchQuery = searchQuery.replace(/\+/g, '').toUpperCase();
        const searchPrefix = cleanSearchQuery.match(/([A-Z]+)/i)?.[1];
        const searchNumber = cleanSearchQuery.match(/(\d+)/)?.[1];
        
        // Check if both the prefix and number match
        if (prefix?.toUpperCase() !== searchPrefix || number !== searchNumber) {
            return null;
        }
        
        return {name, description};
    }, courseName);

    if (!courseDetails) {
        return new Response(
            JSON.stringify({ 
                error: "Course not found", 
                message: `No exact match found for course: ${courseName}` 
            }), 
            { 
                status: 404,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    // Try to wait for and interact with the sections button
    try {
        await page.waitForSelector(
            "#course-resultul > li:nth-child(1) button.esg-collapsible-group__toggle",
            { timeout: 5000 } // Reduced timeout since we know the page is loaded
        );
        
        const buttonExists = await page.evaluate(() => {
            const button = document.querySelector("#course-resultul > li:nth-child(1) button.esg-collapsible-group__toggle");
            return !!button;
        });
        
        // Double check button exists after waiting
        if (!buttonExists) {
            return new Response(JSON.stringify({ 
                course: courseDetails, 
                sortedCoursesAndTerms: [] 
            }), { 
                headers: { "Content-Type": "application/json" } 
            });
        }
        
        // ✅ Click the collapsible group toggle
        await page.$eval(
            "#course-resultul > li:nth-child(1) button.esg-collapsible-group__toggle",
            (button) => {
                button.click();
            }
        );
    } catch (error) {
        // If waiting for button times out, return just course details
        return new Response(JSON.stringify({ 
            course: courseDetails, 
            sortedCoursesAndTerms: [] 
        }), { 
            headers: { "Content-Type": "application/json" } 
        });
    }

    // ✅ Wait for the TermsAndSections container to appear
    await page.waitForSelector(
      "#course-resultul > li:nth-child(1) div[data-bind='foreach: TermsAndSections']",
      {
        timeout: 60000,
      }
    );

    // ✅ Wait until at least one <h4> has text content
    await page.waitForFunction(
      () => {
        const terms = document.querySelectorAll(
          "#course-resultul > li:nth-child(1) div[data-bind='foreach: TermsAndSections'] > h4"
        );
        return (
          terms.length > 0 &&
          Array.from(terms).some((h4) => h4.textContent.trim().length > 0)
        );
      },
      { timeout: 60000 }
    );

    const extractedData = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(
          "#course-resultul > li:nth-child(1) div[data-bind='foreach: TermsAndSections']"
        )
      ).flatMap((termDiv) => {
        const sections = Array.from(
          termDiv.querySelectorAll('ul[data-bind="foreach: Sections"] li')
        ).map((li) => {
          const sectionName = li.querySelector("a.search-sectiondetailslink")?.textContent?.trim() || "No Section name provided";

          const professor = li.querySelector(`span[title="Show Office Hours"]`)?.textContent?.trim();

          const seats = li.querySelector("span.search-seatsavailabletext")?.textContent?.trim() || "No Seat Data";

          const allTimes = Array.from(
            li.querySelectorAll("span.search-meetingtimestext")
          )
            .map((span) => span.textContent?.trim())
            .filter((text) =>
              text?.match(
                /(\d{1,2}\/\d{1,2}\/\d{4})\s*-\s*(\d{1,2}\/\d{1,2}\/\d{4})/
              )
            );

          const dates = allTimes.length > 0 ? allTimes[0] : "No Date Info";

          return { sectionName, professor, seats, dates };
        });

        return sections;
      });
    });

    let sortedCoursesAndTerms: { term: string; sections: any }[] = [
      { term: "Fall 2024", sections: [] },
      { term: "Winter 2024", sections: [] },
      { term: "Spring 2025", sections: [] },
      { term: "Summer I 2025", sections: [] },
      { term: "Summer II 2025", sections: [] },
      { term: "Fall 2025", sections: [] },
    ];

    // ✅ Term constraints (start/end dates)
    const termConstraints = [
      {
        term: "Fall 2024",
        constraint: {
          start: new Date(2024, 8, 1),
          end: new Date(2024, 11, 20),
        },
      },
      {
        term: "Winter 2024",
        constraint: {
          start: new Date(2024, 11, 23),
          end: new Date(2025, 0, 10),
        },
      },
      {
        term: "Spring 2025",
        constraint: { start: new Date(2025, 0, 13), end: new Date(2025, 4, 7) },
      },
      {
        term: "Summer I 2025",
        constraint: {
          start: new Date(2025, 4, 20),
          end: new Date(2025, 5, 15),
        },
      },
      {
        term: "Summer II 2025",
        constraint: { start: new Date(2025, 6, 2), end: new Date(2025, 7, 27) },
      },
      {
        term: "Fall 2025",
        constraint: {
          start: new Date(2025, 8, 1),
          end: new Date(2025, 11, 20),
        },
      },
    ];

    extractedData.map((course) => {
      const [start, end] = course.dates.split(" - ");

      // ✅ Extract and normalize start date
      const [startMonth, startDay, startYear] = start.split("/").map(Number);
      const formattedStartYear = startYear < 100 ? 2000 + startYear : startYear; // Handle 2-digit years

      const startDateFormat = new Date(
        formattedStartYear,
        startMonth - 1,
        startDay
      );

      // ✅ Extract and normalize end date
      const [endMonth, endDay, endYear] = end.split("/").map(Number);
      const formattedEndYear = endYear < 100 ? 2000 + endYear : endYear; // Handle 2-digit years

      const endDateFormat = new Date(formattedEndYear, endMonth - 1, endDay);

      // Fall Statement Check
      if (startDateFormat >= termConstraints[0].constraint.start && endDateFormat <= termConstraints[0].constraint.end) {
        sortedCoursesAndTerms[0].sections.push({
          name: course.sectionName,
          professor: course.professor,
          seats: course.seats,
          startDate: startDateFormat,
          endDate: endDateFormat,
        });
      }

      // Winter Statement Check
      if (startDateFormat >= termConstraints[1].constraint.start && endDateFormat <= termConstraints[1].constraint.end) {
        sortedCoursesAndTerms[1].sections.push({
          name: course.sectionName,
          professor: course.professor,
          seats: course.seats,
          startDate: startDateFormat,
          endDate: endDateFormat,
        });
      }

      // Spring Statement Check
      if (startDateFormat >= termConstraints[2].constraint.start && endDateFormat <= termConstraints[2].constraint.end) {
        sortedCoursesAndTerms[2].sections.push({
          name: course.sectionName,
          professor: course.professor,
          seats: course.seats,
          startDate: startDateFormat,
          endDate: endDateFormat,
        });
      }

    });

    sortedCoursesAndTerms = sortedCoursesAndTerms.filter(e => e.sections.length > 0)

    return new Response(JSON.stringify({
        course: courseDetails,
        sortedCoursesAndTerms
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        message: "An unexpected error occurred while processing your request" 
      }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
