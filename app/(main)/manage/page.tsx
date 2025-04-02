import React from "react";
import { auth } from "@/lib/auth";
import { getWatchedCourses } from "@/lib/actions";
import NotLoggedIn from "@/components/not-logged-in";
import Form from "next/form";
import Link from "next/link";
import { BookX, Trash, User, Clock, University, CheckCircle } from "lucide-react";
import DeleteCourseForm from '@/components/delete-course-form'
import { cn } from "@/lib/utils";
import emptySnipes from "@/public/images/undraw_searching_no1g.svg"
import Image from "next/image"
const ManageSnipesPage = async () => {
  const session = await auth();
  if (!session?.user) return <NotLoggedIn />;

  const courses = await getWatchedCourses();
  
  return (
    <div>
        <h1 className="font-bold text-[2rem] sm:text-[3rem] text-[#2A3370] tracking-tight">
        🐾 Your Snipes {courses.length > 0 ? `(${courses.length})` : ""} 
      </h1>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {courses.length > 0 ? (
          courses.map((course) => {
            return (
              <div key={course.course_code} className="flex justify-between items-center bg-[#B8C1E5] bg-opacity-15 p-4 sm:p-8 rounded-[20px]">
                <div className="flex flex-col gap-2">

                  {course.is_notified == true ? (
                    <div className="flex gap-2 items-center text-xs font-semibold bg-green-500 text-white px-2 py-1 rounded-full self-start"> <CheckCircle className="w-4 h-4" /> Notified</div>
                  ): (
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-[#4556f8] animate-ping"></div>
                      <span className="text-xs font-medium text-[#4556f8]">Watching</span>
                      <span className="font-semibold text-xs text-gray-500">{course.term}</span>
                    </div>
                  )}
                  <h2 className="font-bold text-lg">{course.course_code}</h2>
                  <p className="flex gap-2 items-center">
                    <User />
                    <span className="text-gray-500 text-sm font-medium">
                      {course.professor}
                    </span>
                  </p>

                  <p className="flex gap-2 items-center">
                    <University />
                    <span className="text-gray-500 text-sm font-medium">
                      {course.locations}
                    </span>
                  </p>

                  <p className="flex gap-2 items-center">
                    <Clock />
                    <span className="text-gray-500 text-sm font-medium">
                      {course.meeting_times}
                    </span>
                  </p>

                  <p className="flex gap-2 items-center">
                    <span className="text-gray-500 text-sm font-medium">
                      {course.available_seats}/{course.total_seats} seats available
                    </span>
                    <span className={cn(`text-xs px-3 py-1 rounded-full bg-red-500 text-white font-medium`, course.available_seats < 1 ? "bg-red-500" : "bg-green-500")}>
                      {course.available_seats < 1 ? "Closed" : "Open"}
                    </span>
                  </p>
                </div>

                <DeleteCourseForm
                  courseCode={course.course_code}
                  userId={course.user_id}
                />
              </div>
            );
          })
        ) : (
          <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
            <Image src={emptySnipes} alt="Empty Snipes" width={200} height={200} />
            <p className="text-gray-500 text-[1.2rem] font-medium">
              No courses sniped
            </p>
            <Link
              href="/search"
              className="text-blue-500 text-sm font-medium hover:underline"
            >
              Add a course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSnipesPage;
