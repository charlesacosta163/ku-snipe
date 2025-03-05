'use server'

import { signIn, signOut, auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import supabase from "./supabase";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { TIER_LIMITS } from "./constants";

export async function signInWithGoogle() {
    const response = await signIn("google", {redirectTo: "/dashboard"})
}

export async function signOutFromGoogle() {
    await signOut({redirectTo: '/signin'})
}

export async function fetchCourseData(search: string, retries = 2) {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
  
    for (let i = 0; i <= retries; i++) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            name: search.split(" ").join("+")
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        if (i === retries) {
          throw error;
        }
        // Wait 2 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
}

export async function watchCourse(formData: FormData) {
    try {
      const authData = await auth();
        const user = authData?.user;

        if (!user) {
            throw new Error("Unauthorized");
        }

        // Check tier limit for scout
        if (user.tier === "scout") {
            const { count } = await supabase
                .from("sniped_courses")
                .select("*", { count: 'exact' })
                .eq("user_id", user.id) as { count: number };

            if (count >= 1) {
                return { 
                    success: false, 
                    error: "Scout tier is limited to 1 course. Upgrade to watch more courses!" 
                };
            }
        }

        // Check tier limit for sharpshooter
        if (user.tier === "sharpshooter") {
          const { count } = await supabase
              .from("sniped_courses")
              .select("*", { count: 'exact' })
              .eq("user_id", user.id) as { count: number };

          if (count >= 3) {
              return { 
                  success: false, 
                  error: "Sharpshooter tier is limited to 3 courses. Upgrade to watch more courses!" 
              };
          }
      }
        
        const userId = user.id;
        const courseCode = formData.get("courseCode") as string;
        const professor = formData.get("professor") as string;
        const seats = formData.get("seats") as string;
        const term = formData.get("term") as string;

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
            })
            .select();
            
        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };

    } catch (err) {
        return { success: false, error: 'Failed to add course' };
    }
}

export async function getWatchedCourses() {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const {data, error} = await supabase
        .from("sniped_courses")
        .select("*")
        .eq("user_id", session.user.id);
        
        if (error) {
            console.log("error dawg")
            throw error;
        }
        return data;
      
}

export async function deleteCourse(formData: FormData) {
    const courseCode = formData.get("courseCode") as string;
    const userId = formData.get("userId") as UUID;

    const {data, error} = await supabase
        .from("sniped_courses")
        .delete()
        .eq("course_code", courseCode)
        .eq("user_id", userId);
        
    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/manage")
    return { success: true };

  }