'use client'

import { watchCourse } from "@/lib/actions"
import { toast } from "sonner"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"

const SubmitButton = () => {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      className="button bg-[#0095fd] text-white"
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
            <div>
              <span className="font-bold">{courseName}</span> added to watchlist!
            </div>
          )
      router.push('/manage')  // Navigate after showing toast
    } else {
      toast.error(result.error || 'Failed to add course to watchlist')
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
