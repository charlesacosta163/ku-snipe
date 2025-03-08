import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { CircleAlert } from 'lucide-react'

const UnderConstructionButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
          <CircleAlert className="w-5 h-5 cursor-pointer animate-bounce text-yellow-500" />
      </DialogTrigger>
      <DialogContent className="bg-blue-600 text-white">
        <DialogHeader>
          <DialogTitle>This app is currently in development.</DialogTitle>
          <DialogDescription className='text-gray-200'>
            All features are not available yet. Discord notifications are not working at the moment. Backend work is still in progress. Although, the app is still functional and you can still watch your favorite courses, but without Discord notifications.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default UnderConstructionButton;