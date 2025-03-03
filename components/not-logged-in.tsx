import React from 'react'
import { UserRoundX } from 'lucide-react'
import Link from 'next/link'

const NotLoggedIn = () => {
  return (
    <div className='w-full h-full flex-center flex-col gap-4'>
        <UserRoundX size={100} className='text-red-500'/>
        <h1 className='text-2xl font-bold text-red-500'>You are not logged in</h1>
        <p className='text-gray-500'>Please log in to continue</p>
        <Link href="/signin" className='button bg-gray-700 text-white'>Login</Link>
    </div>
  )
}

export default NotLoggedIn