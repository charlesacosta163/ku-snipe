import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractCourseDetails(courseString: string) {
  const match = courseString.match(/^(.*?)(?=\s\(\d+\sCredits\))/);
  return match ? match[1] : null;
}

// spring25 -> 25/SP
export function convertTermToYear(term: string) {
  // Extract the year (last 2 digits)
  const year = term.slice(-2);
  
  // Extract and convert the season to two-letter code
  let seasonCode = "";
  if (term.toLowerCase().includes("spring")) {
    seasonCode = "SP";
  } else if (term.toLowerCase().includes("summer1")) {
    seasonCode = "S1";
  } else if (term.toLowerCase().includes("summer2")) {
    seasonCode = "S2";
  } else if (term.toLowerCase().includes("fall")) {
    seasonCode = "FA";
  } else if (term.toLowerCase().includes("winter")) {
    seasonCode = "WB";
  }
  
  return `${year}/${seasonCode}`;
}

/**
 * Returns an array with unique values
 * @param array The array to remove duplicates from
 * @returns A new array with only unique values
 */
export function getUniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}

// Alternatively, for objects with a specific key
export function getUniqueArrayByKey<T>(array: T[], key: keyof T): T[] {
  return array.filter((item, index, self) =>
    index === self.findIndex((t) => t[key] === item[key])
  );
}

