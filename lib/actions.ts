'use server'

import { signIn, signOut, auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import supabase from "./supabase";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function signInWithGoogle() {
    const response = await signIn("google", {redirectTo: "/dashboard"})
}

export async function signOutFromGoogle() {
    await signOut({redirectTo: '/signin'})
}

export async function fetchCourseData(search: string) {
    // Verify authentication
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
  
    // Make the API request
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        name: search.split(" ").join("+")
      })
    });
  
    return await response.json();
  } 

export async function watchCourse(formData: FormData) {
    try {
        const courseCode = formData.get("courseCode") as string;
        const professor = formData.get("professor") as string;
        const seats = formData.get("seats") as string;
        const userId = formData.get("userId") as UUID;
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

        console.log(data)
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