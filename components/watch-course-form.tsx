'use client'

import { watchCourse } from "@/lib/actions"
import { toast } from "sonner"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import Link from "next/link"

const SubmitButton = () => {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      className="button bg-[#3746a7] text-[#e6ebff]"
      disabled={pending}
    >
      {pending ? 'Adding...' : 'Watch'}
    </button>
  )
}

export function WatchCourseForm({ 
  courseCode, 
  professor, 
  seats, 
  userId, 
  term 
}: { 
  courseCode: string
  professor: string
  seats: string
  userId: string
  term: string 
}) {
  const router = useRouter()

  async function clientAction(formData: FormData) {
    const result = await watchCourse(formData)

    const courseName = formData.get("courseCode") as string;
    
    if (result.success) {
        toast.success(
            <div className="flex gap-2 items-center justify-between">
              <span><b>{courseName}</b> added to watchlist!</span>
                <Link href='/manage' className="px-2 py-1 text-xs rounded-lg bg-gray-700 text-white font-semibold">View</Link>
            </div>
          )
    } else {
      toast.error(result.error)
    }
  }

  return (
    <form action={clientAction}>
      <SubmitButton />
      <input type="hidden" name="courseCode" value={courseCode} />
      <input type="hidden" name="professor" value={professor} />
      <input type="hidden" name="seats" value={seats} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="term" value={term} />
    </form>
  )
}
