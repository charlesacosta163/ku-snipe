import React from "react";

const Course = ({name, description}: {
  name: string, description: string
}) => {
  return (
    <div className="bg-transparent border-4 border-blue-100 p-4 sm:p-8 rounded-[20px]">
      <h1 className="font-large text-[#2A3370]">{name || "No course name found"}</h1>

      <p className="text-md font-medium text-gray-500 mt-4">
       {description || "No course description found"}
      </p>
    </div>
  );
};

export default Course;
