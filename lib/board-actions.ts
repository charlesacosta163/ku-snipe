"use server";

import { auth } from "./auth";
import { revalidatePath } from "next/cache";
import supabase from "./supabase";
import { redirect } from "next/navigation";
import { UUID } from "crypto";

export async function createBoard(
  boardName: string,
  boardDescription: string,
  boardColor: string
) {
  try {
    const session = await auth();

    if (!session) {
      redirect("/signin");
    }

    const userId = session.user?.id as string;

    // Limit to 10 boards per user
    const { data: boardCount, error: countError } = await supabase
      .from("kanban_boards")
      .select("count")
      .eq("user_id", userId)
      .single();


    // Since we are in beta, premium access is granted to all users
    // Boards = 10 as max
    // Modify for the stable release
    if (boardCount?.count && boardCount.count >= 10) {
      return {
        success: false,
        message: "You have reached the maximum number of boards",
      };
    }

    const { data, error } = await supabase.from("kanban_boards").insert({
      title: boardName,
      description: boardDescription,
      color: boardColor,
      user_id: userId as UUID,
    });

    if (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to create board",
        error: error,
      };
    }

    revalidatePath("/boards");

    return {
      success: true,
      message: "Board created successfully",
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getBoards() {
  try {
    const session = await auth();

    if (!session) {
      redirect("/signin");
    }

    const userId = session.user?.id as string;

    const { data, error } = await supabase
      .from("kanban_boards")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
    }

    return data || [];
  } catch (error) {
    console.error(error);
  }
}

export async function updateBoard(
  boardId: string,
  boardName: string,
  boardDescription: string,
  boardColor: string
) {
  try {
    const session = await auth();

    if (!session) {
      redirect("/signin");
    }

    const userId = session.user?.id as string;

    const { data, error } = await supabase
      .from("kanban_boards")
      .update({
        title: boardName,
        description: boardDescription,
        color: boardColor,
      })
      .eq("id", boardId)
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to update board",
        error: error,
      };
    }

    revalidatePath("/boards");

    return {
      success: true,
      message: "Board updated successfully",
      data: data,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteBoard(boardId: string) {
  try {
    const session = await auth();

    if (!session) {
      redirect("/signin");
    }

    const userId = session.user?.id as string;

    const { data, error } = await supabase
      .from("kanban_boards")
      .delete()
      .eq("id", boardId)
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to delete board",
        error: error,
      };
    }

    revalidatePath("/boards");

    return {
      success: true,
      message: "Board deleted successfully",
    };
  } catch (error) {
    console.error(error);
  }
}

// Board Courses Actions

export async function createCourse(
  boardId: string,
  courseCode: string,
  courseName: string,
  courseNotes: string,
  courseStatus: string,
  coursePriority: Number
) {
  try {
    const session = await auth();

    if (!session) {
      redirect("/signin");
    }

    const userId = session.user?.id as UUID;

    const { data, error } = await supabase.from("kanban_courses").insert({
      board_id: boardId,
      course_code: courseCode,
      course_name: courseName,
      note: courseNotes,
      status: courseStatus || 3,
      priority: coursePriority || "none",
      user_id: userId,
    });

    if (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to create course",
        error: error,
      };
    }

    revalidatePath("/boards");

    return {
      success: true,
      message: "Course created successfully",
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllBoardCourses(boardId: string) {
  try {
    const session = await auth();

    if (!session) {
      redirect("/signin");
    }

    const userId = session.user?.id as UUID;

    const { data, error } = await supabase
      .from("kanban_courses")
      .select("*")
      .eq("board_id", boardId)
      .eq("user_id", userId)
      .order("priority", { ascending: true });

    if (error) {
      console.error(error);
    }

    return data || [];
  } catch (error) {
    console.error(error);
  }
}

export async function deleteBoardCourse(courseId: string) {
  try {
    const session = await auth();

    if (!session) {
      redirect("/signin");
    }

    const userId = session.user?.id as UUID;

    const { data, error } = await supabase
      .from("kanban_courses")
      .delete()
      .eq("id", courseId)
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to delete course",
        error: error,
      };
    }

    revalidatePath("/boards");

    return {
      success: true,
      message: "Course deleted successfully",
    };
  } catch (error) {
    console.error(error);
  }
}

export async function updateBoardCourse(
  courseId: string,
  courseCode: string,
  courseName: string,
  courseNotes: string,
  courseStatus: string,
  coursePriority: Number
) {
  try {
    const session = await auth();

    if (!session) {
      redirect("/signin");
    }

    const userId = session.user?.id as UUID;

    const { data, error } = await supabase
      .from("kanban_courses")
      .update({
        course_code: courseCode,
        course_name: courseName,
        note: courseNotes,
        status: courseStatus || 3,
        priority: coursePriority || "none",
        user_id: userId,
      })
      .eq("id", courseId)
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to update course",
        error: error,
      };

      revalidatePath("/boards");

      return {
        success: true,
        message: "Course updated successfully",
      };
    }
  } catch (error) {
    console.error(error);
  }
}
