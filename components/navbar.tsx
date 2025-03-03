import React from "react";
import Link from "next/link";

import { auth, signOut, signIn } from "@/lib/auth";
import { signOutFromGoogle } from "@/lib/actions";
import ProfileButton from "./profile-button";
import { LogOut } from "lucide-react";

import { Bell } from "lucide-react";
import { AlignJustify } from "lucide-react";
import PageName from "./page-name";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-4">
      <nav className="flex justify-between items-center px-4 py-2 sm:px-6 sm:py-3 bg-[#f5f5ff] rounded-[20px] border-2 border-gray-200 ">
        <PageName />
        <Link href='/dashboard' id='Logo' className='block sm:hidden font-large text-blue-400'>📘 Snipe</Link>

        <div className="flex gap-4 items-center text-sm font-medium">
          <Bell />

          <span className="hidden sm:block">
            {!session?.user ? (
              <Link
                href="/signin"
                className="button bg-gradient-to-br from-[#1ec5ff] to-[#0095fd] text-white"
              >
                Login
              </Link>
            ) : (
              <ProfileButton image={user?.image || ""} name={user?.name || ""} />
            )}
          </span>

          <div className="relative sm:hidden">
            {/* Hidden Checkbox - Controls State */}
            <input type="checkbox" id="nav-menu" className="peer hidden" />

            {/* Menu Button */}
            <label htmlFor="nav-menu" className="cursor-pointer block p-2">
              <AlignJustify />
            </label>

            <label
              htmlFor="nav-menu"
              className="fixed top-0 left-0 bottom-0 min-h-screen transition-all w-full invisible opacity-0 
            peer-checked:visible peer-checked:opacity-50 bg-black"
            ></label>

            <div
              className="fixed z-10 w-[200px] flex flex-col gap-4 bg-[#f5f5ff] shadow opacity-0 invisible 
    peer-checked:top-8 peer-checked:right-4 peer-checked:opacity-100 peer-checked:visible 
    transition-all rounded-lg p-4 border-2 border-gray-200"
            >
              {!session?.user ? (
                <Link
                  href="/signin"
                  className="button bg-gradient-to-br from-[#1ec5ff] to-[#0095fd] text-white self-start"
                >
                  Login
                </Link>
              ) : (
                <div className="flex flex-col gap-4">
                  <header className="flex items-center gap-2">
                    <img
                      src={user?.image || ""}
                      alt="Profile Image"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <span className="text xs font-medium text-gray-600">
                      {user?.name || "Not Logged In"}
                    </span>
                  </header>

                  <div className="flex flex-col font-medium text-sm w-full text-blue-400">
                    <Link
                      href="/dashboard"
                      className="duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/search"
                      className="duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg"
                    >
                      Search
                    </Link>
                    <Link
                      href="/manage"
                      className="duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg"
                    >
                      Manage
                    </Link>
                    <div className="duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg">
                      Subscription
                    </div>
                  </div>

                    <form action={signOutFromGoogle} className="rounded">
                      <button
                        type="submit"
                        className="w-full text-red-400 font-medium hover:text-white hover:bg-red-400 flex gap-2 text-sm duration-200 rounded px-2 py-1 items-center"
                      >
                        <LogOut className="rotate-180" /> Log Out
                      </button>
                    </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
