"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LayoutDashboard, BookOpenText, Search, User } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-purple-200 text-blue-600 font-semibold' : '';
  }

  return (
    <section className='sticky !important top-4'>
        <div className='w-[250px] h-[calc(100vh-2rem)] bg-transparent flex flex-col gap-4 items-center p-4 rounded-[20px]'>

            <h1 id='Logo' className='logo text-blue-400'>📘 Snipe</h1>

            <div className="flex flex-col gap-2 font-medium w-full text-gray-600">
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
            </div>
        </div>
    </section>
  )
}

export default Sidebar