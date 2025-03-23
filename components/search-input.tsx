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
import { Search } from "lucide-react";

import { ChevronDown, ChevronRight } from "lucide-react";

import { ALL_COURSES, ALL_LOCATIONS, ALL_TERMS } from "@/lib/constants";

const SearchInput = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("KUU");

  const [advancedOpen, setAdvancedOpen] = useState(false);
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
        window.location.href = `/course?search=${encodeURIComponent(query)}&term=${selectedTerm}&location=${selectedLocation}`;
      }}
    >
      <div className="bg-[#7F8AC9] p-4 rounded-lg [&>div>div>label]:text-white flex flex-col gap-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="search" className="text-sm font-semibold mb-1">
              Select a Department
            </label>
            <Select onValueChange={setSelectedCourse} required>
              {" "}
              {/* ✅ Capture selection */}
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {ALL_COURSES.map((option) => (
                  <SelectItem key={option.code} value={option.code}>
                    {option.name} ({option.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="search" className="text-sm font-semibold mb-1">
              Enter a course code
            </label>
            <input
              type="number"
              name="search"
              id="search"
              className="w-full px-4 py-2 rounded-md text-sm font-medium bg-white"
              placeholder="e.g 3740"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="search" className="text-sm font-semibold mb-1">
              Enter a Term
            </label>
            <Select onValueChange={setSelectedTerm} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Term" />
              </SelectTrigger>
              <SelectContent>
                {ALL_TERMS.map((option) => (
                  <SelectItem key={option.termValue} value={option.termValue}>
                    {option.termName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>

        <div className="flex items-center gap-4 mt-4">
          <button
            type="submit"
            className="button bg-blue-700 text-white self-start flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>

          <button type="button" className="text-sm font-semibold mb-1 flex items-center gap-2 text-white hover:underline" onClick={() => setAdvancedOpen(!advancedOpen)}>Advanced {advancedOpen ? <ChevronDown /> : <ChevronRight />}</button>

        </div>

        {/* have a advanced click open close state to show location select */}
        <div>

          <div className={`${advancedOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col gap-1">
              <label htmlFor="search" className="text-sm font-semibold mb-1 text-white">
                Enter a Location
              </label>
              <Select onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_LOCATIONS.map((option) => (
                    <SelectItem key={option.locationValue} value={option.locationValue}>
                      {option.locationName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>

        </div>
      </div>
    </Form>
  );
};

export default SearchInput;
