import React from "react";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

import { User } from "@/types";

import { TIER_FEATURES } from "@/lib/constants";
import NotLoggedIn from "@/components/not-logged-in";
import SignInDiscordBtn from "@/components/signindiscordbtn";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) return <NotLoggedIn />;


  const user = session.user as User;
  const userCurrentTier = TIER_FEATURES.find((e) => e.tierName == user.tier);

  return (
    <section className="max-w-[600px] w-full p-4 sm:p-8 rounded-xl bg-transparent text-[#2A3370] border-2 border-gray-200">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        {user.image && (
          <img
            src={user.image}
            alt="Profile"
            className="rounded-full w-[40px] h-[40px] sm:w-[80px] sm:h-[80px]"
          />
        )}
        <div>
          <h1 className="text-lg sm:text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-600">Subscription</h2>
          <span
            className={cn(
              "text-sm px-4 py-1 rounded-full font-semibold border border-gray-200",
              user.tier === "scout" ? "bg-[#B8C1E5] bg-opacity-20" : "",
              user.tier === "sharpshooter" ? "bg-blue-100 text-blue-700" : "",
              user.tier === "elite" ? "bg-black text-white" : ""
            )}
          >
            {user.tier.toUpperCase()}
          </span>
        </div>

        {/* Benefits Card */}
        <div className="bg-[#B8C1E5] bg-opacity-15 p-6 rounded-lg">
          <h3 className="text-md sm:text-xl font-bold mb-4">
            Your Snipe Benefits
          </h3>
          <ul className="space-y-3 text-sm sm:text-md">
            <li className="text-gray-600">
              • Track up to {userCurrentTier?.maxSnipedCourses} courses
            </li>
            <li className="text-gray-600">
              • {userCurrentTier?.messagingMethod}
            </li>
          </ul>
        </div>
      </div>

      {/* Parent div for Flexbox layout */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SignInDiscordBtn />

      {user.tier == 'scout' || user.tier == 'sharpshooter' ? (<button className="flex gap-2 items-center self-start font-medium text-gray-200 bg-[#2A3370] button hover:bg-gray-800 transition-colors">
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L12 20M12 4L18 10M12 4L6 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Upgrade Subscription
    </button>) : <></>}
      </div>
    </section>
  );
};

export default ProfilePage;
