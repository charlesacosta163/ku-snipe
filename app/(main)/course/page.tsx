import React from 'react'
import Course from '@/components/course'
import SearchInput from '@/components/search-input'

import { auth } from '@/lib/auth'
import CourseSections from '@/components/course-sections'
import Link from 'next/link'
import { fetchCourseData } from '@/lib/actions'
import NotLoggedIn from '@/components/not-logged-in'
import ReloadPageBtn from '@/components/reloadpagebtn'
import { ALL_TERMS, ALL_LOCATIONS } from '@/lib/constants'


const CoursePage = async ({searchParams} : {searchParams: { search?: string, term?: string, location?: string }}) => {
    const { search, term, location } = await searchParams;

    const session = await auth();

    if (!session?.user) return <NotLoggedIn />;

    // Fetch course data
    const data = await fetchCourseData(search || "", term || "", location || "");
    const termName = ALL_TERMS.find(t => t.termValue === term)?.termName || "";
    const locationName = ALL_LOCATIONS.find(l => l.locationValue === location)?.locationName || "";
     
    return (
        <div className="flex flex-col gap-4">
            <div className='flex flex-col gap-2'>
            <header className="flex justify-between gap-4 items-center">
            <h1 className="font-bold text-[2rem] sm:text-[3rem] text-[#2A3370] tracking-tight">

                🐾 Search Result: {search?.toUpperCase() || ""}
                </h1>
                <Link href="/search" className="button bg-gray-700 text-white">Back to Search</Link>
            </header>
            
            <div className='flex gap-2'>
            <p className='text-xs bg-[#7F8AC9] text-white px-2 py-1 rounded-full font-bold self-start'>{termName}</p>
            <p className='text-xs bg-[#7F8AC9] text-white px-2 py-1 rounded-full font-bold self-start'>{locationName}</p>
            </div>
            </div>

            {data.error ? (
                <>
                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                        <h2 className="text-red-800 font-semibold text-lg">{data.error}</h2>
                        <p className="text-red-600">{data.message}</p>
                    </div>
                    <ReloadPageBtn />
                </>
                
            ) : (
                <div className="flex flex-col gap-4">
                    <section>
                        <Course name={data.course.name} description={data.course.description}/>
                    </section>

                    {data.sortedCoursesAndTerms.length > 0 ? (
                        <CourseSections data={data.sortedCoursesAndTerms} userId={session?.user.id as string}/>
                    ) : (
                        <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                            <h2 className="text-yellow-800 font-semibold text-lg">No Sections Available</h2>
                            <p className="text-yellow-700">This course exists but has no sections available for registration at this time.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CoursePage