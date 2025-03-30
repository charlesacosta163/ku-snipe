"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutFromGoogle } from "@/lib/actions";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import ProfileButton from "./profile-button";
import UnderConstructionButton from "./under-construction-btn";

import {
  LayoutDashboard,
  BookOpenText,
  Search,
  User,
  AlignJustify,
  LogOut,
  Bell,
} from "lucide-react";

import { TIER_FEATURES } from "@/lib/constants";
import { User as UserInterface } from "@/types/index";

const Navbar = ({ user }: { user: UserInterface }) => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop() || '';
  const pageName = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  const userCurrentTier = TIER_FEATURES.find((e) => e.tierName == user.tier);

  return (
    <header className="sticky top-4 z-50">
      <nav className="flex justify-between items-center rounded-full px-4 py-1 sm:px-6 sm:py-2 bg-[#FFF5F5] sm:rounded-full border-2 border-[#B8C1E5] border-opacity-50 shadow-lg relative z-50">
        <h1 className="font-large hidden md:block text-[#2A3370]">{pageName}</h1>
        <Link
          href="/dashboard"
          id="Logo"
          className="md:hidden font-[900] tracking-tight font-serif text-[#2A3370] rounded-lg flex items-center gap-2"
        >
          📘 KU-WATCH
        </Link>

        <div className="flex gap-4 items-center text-sm font-medium">
          <UnderConstructionButton />
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" />

          <span className="hidden md:block">
            <ProfileButton
              image={user?.image || ""}
              name={user?.name || ""}
              tier={user?.tier || ""}
            />
          </span>

          {/* Mobile Menu using DropdownMenu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none p-2">
                  <AlignJustify className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[250px] p-4 bg-[#FFF5F5]">
                {/* User Profile Header */}
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={user?.image || ""}
                    alt="Profile Image"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-600">
                      {user?.name || "Not Logged In"}
                    </span>
                    <div
                      className={`self-start text-[8px] font-semibold px-2 py-[0.025rem] rounded-full ${
                        userCurrentTier?.tierName === "scout"
                          ? "text-gray-700 bg-gray-200"
                          : userCurrentTier?.tierName === "sharpshooter"
                          ? "text-blue-700 bg-blue-100"
                          : userCurrentTier?.tierName === "elite"
                          ? "text-white bg-black"
                          : ""
                      }`}
                    >
                      {userCurrentTier?.tierName.toUpperCase()}
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator />
                
                {/* Navigation Links */}
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link href="/search" className="flex items-center gap-2 cursor-pointer">
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link href="/manage" className="flex items-center gap-2 cursor-pointer">
                    <BookOpenText className="w-4 h-4" />
                    <span>Manage</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                {/* Logout Button */}
                <DropdownMenuItem asChild>
                  <button
                    onClick={() => signOutFromGoogle()}
                    className="w-full text-red-400 hover:text-white hover:bg-red-400 transition-all duration-300 font-medium flex gap-2 cursor-pointer items-center"
                  >
                    <LogOut className="rotate-180 w-4 h-4" /> 
                    <span>Log Out</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
