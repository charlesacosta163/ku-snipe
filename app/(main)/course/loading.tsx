import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

const LoadingCourse = () => {
  return (
    <>
      <div className="flex gap-4 justify-between items-center">
        <div>
          <span className="font-bold text-[2rem] text-gray-700 tracking-tight mr-2">
            Search Result: <span className="text-gray-400">Loading...</span>
          </span>{" "}
        </div>

        <Link href="/search" className="button bg-gray-700 text-white">
          Back to Search
        </Link>
      </div>

      <div className="bg-white shadow p-8 rounded-[20px] flex flex-col gap-4 mt-4">
        <Skeleton count={5} />
      </div>
    </>
  );
};

export default LoadingCourse;
