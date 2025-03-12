"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LayoutDashboard, BookOpenText, Search, User } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-[#7F8AC9] !text-white font-semibold' : '';
  }

  return (
    <section className='sticky !important top-4'>
        <div className='w-[250px] h-[calc(100vh-2rem)] bg-transparent flex flex-col gap-4 items-center p-4 rounded-[20px]'>

            <h1 id='Logo' className='logo text-blue-400'>📘 Snipe</h1>

            {/* <div className="flex flex-col gap-2 font-medium w-full text-gray-600">
              <Link href='/dashboard' className={`flex items-center gap-2 duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg ${isActive('/dashboard')} shadow-md`}>
                <LayoutDashboard className='w-4 h-4' />
                Dashboard
              </Link>
              <Link href='/search' className={`flex items-center gap-2 duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg ${isActive('/search')} shadow-md`}>
                <Search className='w-4 h-4' />
                Search
              </Link>
              <Link href='/manage' className={`flex items-center gap-2 duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg ${isActive('/manage')} shadow-md`}>
                <BookOpenText className='w-4 h-4' />
                Manage
              </Link>
              <Link href='/profile' className={`flex items-center gap-2 duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg ${isActive('/profile')} shadow-md`}>
                <User className='w-4 h-4' />
                Profile
              </Link>
            </div> */}

            <div className="grid grid-cols-1 h-full gap-2 font-medium w-full">
              <Link href='/dashboard' className={`flex justify-between gap-2 bg-[#2A3370] text-[#B8C1E5] duration-200 hover:bg-[#7F8AC9] p-4 rounded-lg ${isActive('/dashboard')} shadow-md`}>
                <LayoutDashboard className='w-10 h-10' />
                <span className='self-end text-[1.5rem] font-bold'>Dashboard</span>
              </Link>
              <Link href='/search' className={`flex justify-between gap-2 bg-[#2A3370] text-[#B8C1E5] duration-200 hover:bg-[#7F8AC9] p-4 rounded-lg ${isActive('/search')} shadow-md`}>
                <Search className='w-10 h-10' />
                <span className='self-end text-[1.5rem] font-bold'>Search</span>
              </Link>
              <Link href='/manage' className={`flex justify-between gap-2 bg-[#2A3370] text-[#B8C1E5] duration-200 hover:bg-[#7F8AC9] p-4 rounded-lg ${isActive('/manage')} shadow-md`}>
                <BookOpenText className='w-10 h-10' />
                <span className='self-end text-[1.5rem] font-bold'>Manage</span>
              </Link>
              <Link href='/profile' className={`flex justify-between gap-2 bg-[#2A3370] text-[#B8C1E5] duration-200 hover:bg-[#7F8AC9] p-4 rounded-lg ${isActive('/profile')} shadow-md`}>
                <User className='w-10 h-10' />
                <span className='self-end text-[1.5rem] font-bold'>Profile</span>
              </Link>
            </div>
        </div>
    </section>
  )
}

export default Sidebar