import React from "react";
import Form from "next/form";

const SearchInput = () => {
  return (
    <Form action='/course' className="text-gray-700 flex flex-col" formMethod="POST">
      <label htmlFor="search" className="text-sm font-semibold mb-1">
        Enter a course code
      </label>

      <div className="flex gap-2">
        <div className="max-w-[600px] w-full">
          <input
            type="text"
            name="search"
            id="search"
            className="w-full px-4 py-2 rounded-[10px] text-sm font-medium bg-gray-100"
            placeholder="e.g CPS 3740"
          />
        </div>
        <button type="submit" className="button bg-blue-700 text-white">Search</button>
      </div>
    </Form>
  );
};

export default SearchInput;
