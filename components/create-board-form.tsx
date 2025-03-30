'use client'

import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Plus, Ellipsis } from 'lucide-react'
  import Form from 'next/form'

  import { ALL_BOARD_COLORS } from '@/lib/constants'

import { createBoard } from '@/lib/board-actions'
import { toast } from "sonner"


const CreateBoardForm = () => {

    const [boardName, setBoardName] = useState('')
    const [boardDescription, setBoardDescription] = useState('')
    const [boardColor, setBoardColor] = useState('')

    const color = ALL_BOARD_COLORS.find((color) => color.name === boardColor)?.taskColor

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const result = await createBoard(boardName, boardDescription, boardColor)

        if (result?.success) {
            toast.success(result.message)
        } else {
            toast.error(result?.message || 'Failed to create board')
        }
    }

  return (
    <Dialog>
    <DialogTrigger asChild>
        <button className="button flex items-center gap-2 bg-blue-500 text-white"><Plus />Create</button>
    </DialogTrigger>
    <DialogContent style={{ backgroundColor: `${color}`}}>
        <DialogHeader>
        <DialogTitle>Create a new board</DialogTitle>
        <DialogDescription asChild>
            <Form className='flex flex-col gap-4' action={handleSubmit}>

                <div className='flex flex-col gap-1 mt-4'>
                    <label htmlFor="board-name" className='text-sm font-semibold self-start'>Board Name</label>
                    <input onChange={(e) => setBoardName(e.target.value)} type="text" id="board-name" className='w-full px-4 py-2 rounded-md text-sm font-medium bg-white' name="board-name" placeholder='Board Name' required/>
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="board-description" className='text-sm font-semibold self-start'>Board Description</label>
                    <input onChange={(e) => setBoardDescription(e.target.value)} type="text" id="board-description" className='w-full px-4 py-2 rounded-md text-sm font-medium bg-white' name="board-description" placeholder='Board Description' required/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="board-color" className='text-sm font-semibold self-start'>Board Color</label>
                    <Select onValueChange={(value) => setBoardColor(value)} required>
                        <SelectTrigger>
                            <SelectValue placeholder='Select a color' />
                        </SelectTrigger>
                        <SelectContent>
                            {ALL_BOARD_COLORS.map((color) => (
                                <SelectItem key={color.id} value={color.name}>
                                    <div className="flex gap-2 items-center">
                                        <div className='w-4 h-4 rounded-full' style={{ backgroundColor: color.color }}></div>
                                        <div className='text-sm font-medium text-gray-600'>{color.name}</div>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <button type="submit" className='button self-end bg-blue-500 text-white'>Create</button>
                
            </Form>

        </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>
  )
}

export default CreateBoardForm