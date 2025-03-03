import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractCourseDetails(courseString: string) {
  const match = courseString.match(/^(.*?)(?=\s\(\d+\sCredits\))/);
  return match ? match[1] : null;
}