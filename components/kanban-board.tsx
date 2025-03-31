import React from "react";
import { Ellipsis, Plus } from "lucide-react";
import { ALL_BOARD_COLORS, ALL_BOARD_PRIORITIES } from "@/lib/constants";
import ActionsBoardBtn from "./actions-board-btn";
import CreateCourseForm from "./create-course-form";
import { getAllBoardCourses } from "@/lib/board-actions";
import Image from "next/image";
import emptyStreet from "@/public/images/undraw_empty-street_3ogh.svg";
import { capitalize } from "@/lib/utils";
import ActionsBoardCourseBtn from "./actions-board-course-btn";
const KanbanBoard = async ({
  title,
  description,
  color,
  id,
}: {
  title: string;
  description: string;
  color: string;
  id: string;
}) => {
  const colorClass = ALL_BOARD_COLORS.find(
    (board) => board.name.toLowerCase() === color.toLowerCase()
  )?.color;
  const textColor = ALL_BOARD_COLORS.find(
    (board) => board.name.toLowerCase() === color.toLowerCase()
  )?.textColor;
  const taskColor = ALL_BOARD_COLORS.find(
    (board) => board.name.toLowerCase() === color.toLowerCase()
  )?.taskColor;

  const courses = (await getAllBoardCourses(id)) || [];

  return (
    <div className="snap-start min-h-[300px] min-w-full max-w-full sm:min-w-[300px] sm:max-w-[300px]">
      <div
        id="board"
        className={`flex flex-col gap-4 rounded-lg p-4 self-start`}
        style={{ backgroundColor: colorClass, color: textColor }}
      >
        <header>
          <div className="flex justify-between gap-2 items-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold line-clamp-1">{title}</h2>

              <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="flex gap-2 items-center self-start">
              
              {courses?.length > 0 && (
                <div
                  className="w-6 h-6 flex items-center justify-center rounded-full shadow-md"
                  style={{ backgroundColor: taskColor }}
                >
                  <span className="text-xs font-medium">{courses.length}</span>
                </div>
              )}
              <ActionsBoardBtn
                boardId={id}
                title={title}
                description={description}
                color={color}
              />
            </div>
          </div>
        </header>

        {/* Task Grid */}
        <div className="flex flex-col gap-2">
          {courses.length > 0 ? (
              courses?.map((course) => {
              const priority = ALL_BOARD_PRIORITIES.find(priority => priority.value === course.priority)

              return (
              <div
                key={course.id}
                className={`flex justify-between rounded-lg p-2 min-h-[100px]`}
                style={{ backgroundColor: taskColor }}
              >
                <div className="flex flex-col justify-between">
                  <header className="self-start">
                    <div className="text-sm font-bold">
                      {course.course_code}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {course.course_name}
                    </div>
                  </header>

                  <div className="text-xs text-gray-500 my-2">{course.note}</div>

                  <div className="flex flex-wrap gap-2">
                    { course.priority && (
                      <div className="px-2 py-1 rounded-full font-semibold text-xs text-white" style={{ backgroundColor: priority?.color }}>
                        {priority?.name}
                      </div>
                    )}

                    { course.status !== "none"  && (
                      <div className="px-2 py-1 rounded-full font-semibold bg-gray-700 text-xs text-white">
                        {capitalize(course.status)}
                      </div>
                    )}  
                  </div>
                </div>

                <div className="self-center">
                  <ActionsBoardCourseBtn 
                    color={taskColor || ""} 
                    courseId={course.id}
                    userId={course.user_id}
                    courseCode={course.course_code}
                    courseName={course.course_name}
                    courseNotes={course.note}
                    courseStatus={course.status}
                    coursePriority={course.priority}
                  />
                </div>
              </div>
            )
          })
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <Image
                src={emptyStreet}
                alt="Empty Street"
                width={150}
                height={150}
                className="opacity-50"
              />
              <span
                style={{ color: textColor, backgroundColor: taskColor }}
                className="text-xs font-medium rounded-lg px-2 py-0.5 mt-2"
              >
                No courses found
              </span>
            </div>
          )}
        </div>

        <CreateCourseForm
          boardId={id}
          name={title}
          taskColor={taskColor || ""}
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
