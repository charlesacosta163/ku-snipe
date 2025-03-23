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
            Searching Course...
          </span>
        </div>

        <Link href="/search" className="button bg-gray-700 text-white">
          Back to Search
        </Link>
      </div>

      <div className="bg-transparent shadow p-8 rounded-[20px] flex flex-col gap-4 mt-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="text-sm text-blue-600">
            This might take up to a minute...
          </div>
          <div className="text-xs text-gray-500 mt-2">
            We're searching through the course catalog
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingCourse;
