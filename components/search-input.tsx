"use client";

import React, { useState } from "react";
import Form from "next/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ALL_COURSES } from "@/lib/constants";

const SearchInput = () => {
  const [selectedCourse, setSelectedCourse] = useState("");

  return (
    <Form
      action="/course"
      className="text-gray-700 flex flex-col"
      formMethod="POST"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get("search") as string; // Get input value

        if (!selectedCourse || !searchValue) {
          alert("Please select a course and enter a number.");
          return;
        }

        // ✅ Construct concatenated query string (e.g., CPS3740)
        const query = `${selectedCourse}*${searchValue}`;

        // Redirect with full course code
        window.location.href = `/course?search=${encodeURIComponent(query)}`;
      }}
    >
      <label htmlFor="search" className="text-sm font-semibold mb-1">
        Enter a course code
      </label>

      <div className="flex gap-2">
        <Select onValueChange={setSelectedCourse}> {/* ✅ Capture selection */}
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Enter Course Here" />
          </SelectTrigger>
          <SelectContent>
            {ALL_COURSES.map((option) => (
              <SelectItem key={option.code} value={option.code}>
                {option.name} ({option.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="max-w-[130px] w-full">
          <input
            type="number"
            name="search"
            id="search"
            className="w-full px-4 py-2 rounded-[10px] text-sm font-medium bg-white"
            placeholder="e.g 3740"
            required
          />
        </div>

        <button type="submit" className="button bg-blue-700 text-white">
          Search
        </button>
      </div>
    </Form>
  );
};

export default SearchInput;
