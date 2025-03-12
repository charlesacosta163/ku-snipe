import React from "react";
import { auth } from "@/lib/auth";
import SearchInput from "@/components/search-input";
import NotLoggedIn from "@/components/not-logged-in";

const SnipeCoursesPage = async () => {
  const session = await auth();
  if (!session?.user) return <NotLoggedIn />;

  return (
    <div className="w-full h-full flex-center">
      <div className="flex flex-col gap-4 max-w-[600px] w-full mb-16">
        <header className="">
          <h1 className="font-bold text-[3rem] text-[#2A3370] tracking-tight">
            Search a course
          </h1>
          <p className="text-sm text-gray-500">Find everything here</p>
        </header>

        <SearchInput />

      </div>
    </div>
  );
};

export default SnipeCoursesPage;
