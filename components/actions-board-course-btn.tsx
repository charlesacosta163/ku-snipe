"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Form from "next/form";
import { deleteBoardCourse, updateBoardCourse } from "@/lib/board-actions";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Ellipsis, FilePenLine, Trash2 } from "lucide-react";
const ActionsBoardCourseBtn = ({
  color,
  courseId,
  userId,
  courseCode,
  courseName,
  courseNotes,
  courseStatus,
  coursePriority,
}: {
  color: string;
  courseId: string;
  userId: string;
  courseCode: string;
  courseName: string;
  courseNotes: string;
  courseStatus: string;
  coursePriority: number;
}) => {
  const [newCourseName, setNewCourseName] = useState(courseName);
  const [newCourseCode, setNewCourseCode] = useState(courseCode);
  const [newCourseNotes, setNewCourseNotes] = useState(courseNotes);
  const [newCourseStatus, setNewCourseStatus] = useState(courseStatus);
  const [newCoursePriority, setNewCoursePriority] = useState(coursePriority);

  async function handleDeleteCourse() {
    const result = await deleteBoardCourse(courseId);
    if (result?.success) {
      toast.success(result.message);
    } else {
      toast.error(result?.message || "Failed to delete course");
    }
  }

  async function handleUpdateCourse() {
    const result = await updateBoardCourse(courseId, newCourseCode, newCourseName, newCourseNotes, newCourseStatus, newCoursePriority);

    if (result?.success) {
      toast.success(result.message);
    } else {
      toast.error(result?.message || "Failed to update course");
    }
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        style={{ backgroundColor: color, border: `1px solid lightgray` }}
      >
        <DropdownMenuItem asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 text-sm px-2 py-1"
              >
                <FilePenLine className="w-4 h-4" />
                Edit Course
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-4" style={{ backgroundColor: color, border: `1px solid lightgray` }}>
              <h2 className="text-lg font-semibold mb-4">Edit {courseName}</h2>
              <Form onSubmit={() => handleUpdateCourse()} className="flex flex-col gap-2">

                <div className="flex flex-col gap-2">
                  <label htmlFor="courseCode" className="text-sm font-semibold">
                    New Course Code
                  </label>
                  <input
                    type="text"
                    id="courseCode"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    className="w-full px-4 py-2 rounded-md text-sm font-medium bg-white"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label htmlFor="courseName" className="text-sm font-semibold">
                    New Course Name
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="w-full px-4 py-2 rounded-md text-sm font-medium bg-white"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="courseNotes" className="text-sm font-semibold">
                    New Course Notes
                  </label>
                  <textarea
                    id="courseNotes"
                    value={newCourseNotes}
                    onChange={(e) => setNewCourseNotes(e.target.value)}
                    className="w-full px-4 py-2 rounded-md text-sm font-medium bg-white"
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="priority" className="text-sm font-semibold">
                      Priority
                    </label>
                    <Select
                      value={newCoursePriority.toString()}
                      onValueChange={(value) =>
                        setNewCoursePriority(Number(value))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">Low</SelectItem>
                        <SelectItem value="2">Medium</SelectItem>
                        <SelectItem value="1">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="status" className="text-sm font-semibold">
                      Status
                    </label>
                    <Select
                      value={newCourseStatus}
                      onValueChange={(value) => setNewCourseStatus(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                        <SelectItem value="none">No Label</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <button type="submit" className="button self-end bg-orange-500 hover:bg-orange-600 text-white mt-4">
                    Update
                  </button>
                </div>
              </Form>
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Form onSubmit={() => handleDeleteCourse()}>
            <button type="submit" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete Course
            </button>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsBoardCourseBtn;
