"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import Form from "next/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createCourse } from "@/lib/board-actions";
import { toast } from "sonner";

const CreateCourseForm = ({
  boardId,
  name,
  taskColor,
}: {
  boardId: string;
  name: string;
  taskColor: string;
}) => {

    const [status, setStatus] = useState("none");
    const [priority, setPriority] = useState("3");
    const [notes, setNotes] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseName, setCourseName] = useState("");

    const { pending } = useFormStatus();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

       const response = await createCourse(boardId, courseCode, courseName, notes, status, Number(priority));

       if (response?.success) {
        toast.success(response.message);
       } else {
        toast.error(response?.message || "Failed to create course");
       }

       setCourseCode("");
       setCourseName("");
       setNotes("");
       setStatus("none");
       setPriority("3");

    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="button flex gap-2 items-center hover:scale-105 transition-all duration-300 self-start"
          style={{ backgroundColor: taskColor }}
        >
          <Plus className="w-4 h-4" />
          Create Course
        </button>
      </DialogTrigger>

      <DialogContent style={{ backgroundColor: `${taskColor}`}}>
        {/* Add DialogHeader to properly structure the dialog */}
        <DialogHeader>
          <DialogTitle>Add a New Course for {name}</DialogTitle>
          <DialogDescription>
            Enter the course details below
          </DialogDescription>
        </DialogHeader>
        
        <Form action={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="course-name" className="text-sm font-semibold">
              Course Code
            </label>
            <input
              type="text"
              id="course-name"
              name="course-name"
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="e.g. CPS-3740-01"
              className="w-full px-4 py-2 rounded-md text-sm font-medium bg-white"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="course-name" className="text-sm font-semibold">
              Course Name
            </label>
            <input
              type="text"
              id="course-description"
              name="course-description"
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g. Introduction to Computer Science"
              className="w-full px-4 py-2 rounded-md text-sm font-medium bg-white"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="notes" className="text-sm font-semibold">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. This course is about..."
              className="w-full px-4 py-2 rounded-md text-sm font-medium bg-white h-[100px] resize-none"
            />
          </div>

          <div className="flex gap-2 items-center">

            <div className="flex flex-col gap-1">
                <label htmlFor="priority" className="text-sm font-semibold">
                Priority
                </label>
                <Select 
                  value={priority} 
                  onValueChange={(value) => setPriority(value)}
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
                  value={status} 
                  onValueChange={(value) => setStatus(value)}
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

          </div>

          <button
            type="submit"
            disabled={pending}
            className="button bg-orange-500 hover:bg-orange-600 text-white mt-4 self-end"
          >
            {pending ? "Creating..." : "Create Course"}
          </button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseForm;
