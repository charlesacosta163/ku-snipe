import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="w-full h-screen flex-center">
        <div className='w-full h-full flex-center flex-col gap-4'>
            <h1 className='text-2xl font-bold text-red-500'>404 Not Found</h1>
            <p className='text-gray-500'>The page you are looking for does not exist</p>
            <Link href="/" className='button bg-gray-700 text-white'>Go to Home</Link>
        </div>

    </div>
  )
}

export default NotFound