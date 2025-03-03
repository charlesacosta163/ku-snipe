"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-purple-200 text-blue-600 font-semibold' : '';
  }

  return (
    <section className='sticky !important top-4'>
        <div className='w-[250px] h-[calc(100vh-2rem)] bg-[#f5f5ff] flex flex-col gap-4 items-center p-4 rounded-[20px] border-2 border-gray-200'>

            <h1 id='Logo' className='logo text-blue-400'>📘 Snipe</h1>

            <div className="flex flex-col gap-2 font-medium w-full text-gray-600">
                <Link href='/dashboard' className={`duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg ${isActive('/dashboard')}`}>Dashboard</Link>
                <Link href='/search' className={`duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg ${isActive('/search')}`}>Search</Link>
                <Link href='/manage' className={`duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg ${isActive('/manage')}`}>Manage</Link>
                <div className='duration-200 hover:bg-purple-100 px-4 py-2 rounded-lg'>Subscription</div>
            </div>
        </div>
    </section>
  )
}

export default Sidebar