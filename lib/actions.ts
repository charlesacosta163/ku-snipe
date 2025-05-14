"use server";

import { signIn, signOut, auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import supabase from "./supabase";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { TIER_LIMITS, ALL_TERMS, ALL_LOCATIONS } from "./constants";
import { convertTermToYear } from "./utils";
import { Session, User } from "@/types";
export async function signInWithGoogle() {
  const session = await auth();
  let response;

  if (session) redirect("/dashboard");
  else response = await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutFromGoogle() {
  await signOut({ redirectTo: "/signin" });
}

export async function isDiscordLinked() {
  const session = await auth();
  if (!session?.user) return false;

  try {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("provider", "discord")
      .eq("userId", session.user.id)
      .single();

    if (error) {
      // If the error is "no rows found", it means the account isn't linked
      if (error.code === 'PGRST116') {
        return false;
      }
      console.error("Error checking Discord account:", error);
      return false;
    }

    // If we got data, the account is linked
    return !!data;
  } catch (error) {
    console.error("Error in isDiscordLinked:", error);
    return false;
  }
}

export async function linkDiscordAccount() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  // We don't need to check if the account exists here anymore
  // Just initiate the sign-in process
  await signIn("discord", { redirectTo: "/profile" });
  return false;
}

export async function fetchCourseData(search: string, term: string, location: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!search || !term) {
    return {
      error: "No course or term provided",
      message: "Please enter a course and term"
    }
  } else if (!ALL_TERMS.some(t => t.termValue === term)) {
    return {
      error: "Invalid term",
      message: "Please enter a valid term"
    }
  } else if (!ALL_LOCATIONS.some((l: { locationValue: string }) => l.locationValue === location)) {
    return {
      error: "Invalid location",
      message: "Please enter a valid location"
    }
  }

  const timeoutDuration = 9000; // 9 seconds timeout

  try {
    // Create a controller to allow for aborting the fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

    term = convertTermToYear(term);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: search,
          term: term,
          location: location || "KUU"
        }),
        signal: controller.signal
      }
    );

    // Clear the timeout since we got a response
    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        error: "Unavailable at this time",
        message: `The course ${search.toUpperCase()} is currently unavailable at this time. Please try another course.`
      };
    }

    const data = await response.json();

    return data;

  } catch (error) {
    // Check if the error was caused by the timeout/abort
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        error: "Request timeout",
        message: `The search for ${search.toUpperCase()} took too long to complete. Please try again later.`
      };
    }
    
    // Handle other errors
    return {
      error: "Error fetching course",
      message: `An error occurred while searching for ${search.toUpperCase()}. Please try again.`
    };
  }
}

export async function watchCourse(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const authData = await auth();
    const user = authData?.user as User;

    // Check if the user is linked to discord
    const isLinked = await isDiscordLinked();
    if (!isLinked) {
      return {
        success: false,
        error: "Please link your Discord account to continue.",
      };
    }

    if (!user) {
      throw new Error("Unauthorized");
    }

    // Check tier limit for scout
    if (user.tier === "scout") {
      const { count } = (await supabase
        .from("sniped_courses")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)) as { count: number };

      if (count >= 2) {
        return {
          success: false,
          error:
            "You have reached the max limit of course snipes!",
        };
      }
    }

    else if (user.tier === "sharpshooter") {
      const { count } = (await supabase
        .from("sniped_courses")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)) as { count: number };

      if (count >= 8) {
        return {
          success: false,
          error:
            "You have reached the max limit of course snipes!",
        };
      }
    }

    // Modify for production, eliminate this
    else if (user.tier === "elite") {
      const { count } = (await supabase
        .from("sniped_courses")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)) as { count: number };

      if (count >= 100) {
        return {
          success: false,
          error:
            "You have reached the max limit of course snipes!",
        };
      }
    }

    else {
      return {
        success: false,
        error: "Request Denied!",
      };
    }

    const userId = user.id;
    const courseCode = formData.get("courseCode") as string;
    const professor = formData.get("professor") as string;
    const seats = formData.get("seats") as string;
    const term = formData.get("term") as string;
    const locations = formData.get("locations") as string;
    const meetingTimes = formData.get("meetingTimes") as string;

    // Check if the course is already being watched by this user
    const { data: existingCourse, error: checkError } = await supabase
      .from("sniped_courses")
      .select("*")
      .eq("user_id", userId)
      .eq("course_code", courseCode)
      .eq("term", term)
      .single();

    if (existingCourse) {
      return {
        success: false,
        error: `${courseCode} already exists in your manage page.`,
      };
    }

    const seatsArray = seats.split(" / ");
    const availableSeats = parseInt(seatsArray[0]);
    const totalSeats = parseInt(seatsArray[1]);

    const { data, error } = await supabase
      .from("sniped_courses")
      .insert({
        course_code: courseCode,
        term: term,
        user_id: userId,
        available_seats: availableSeats,
        total_seats: totalSeats,
        professor: professor,
        locations: locations,
        meeting_times: meetingTimes
      })
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to add course" };
  }
}

export async function getWatchedCourses() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("sniped_courses")
    .select("*")
    .eq("user_id", session.user.id);

  if (error) {
    console.log("error dawg");
    throw error;
  }
  return data;
}

export async function deleteCourse(formData: FormData) {
  const courseCode = formData.get("courseCode") as string;
  const userId = formData.get("userId") as UUID;

  const { data, error } = await supabase
    .from("sniped_courses")
    .delete()
    .eq("course_code", courseCode)
    .eq("user_id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/manage");
  return { success: true };
}
