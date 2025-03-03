'use client'

import React from 'react'
import { deleteCourse } from '@/lib/actions'
import { toast } from "sonner"
import { Trash } from 'lucide-react'
import { useFormStatus } from 'react-dom'

const SubmitButton = () => {
  const { pending } = useFormStatus()
  
  return (
    <button 
      type="submit"
      disabled={pending}
      className="px-2 py-1 rounded font-semibold flex gap-2 items-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-200 text-xs sm:text-sm"
    >
      <Trash className='sm:block hidden'/>
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  )
}

const DeleteCourseForm = ({ courseCode, userId }: { courseCode: string, userId: string }) => {
  async function clientAction(formData: FormData) {
    const result = await deleteCourse(formData)
    
    if (result.success) {
      toast.success(
        <div>
          <span className="font-bold">{courseCode}</span> removed from watchlist
        </div>
      )
    } else {
      toast.error(result.error || 'Failed to remove course')
    }
  }

  return (
    <form action={clientAction}>
      <SubmitButton />
      <input type="hidden" name="courseCode" value={courseCode} />
      <input type="hidden" name="userId" value={userId} />
    </form>
  )
}

export default DeleteCourseForm