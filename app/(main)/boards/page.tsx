import React from 'react'
import KanbanBoard from '@/components/kanban-board'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CreateBoardForm from '@/components/create-board-form'
import { getBoards } from '@/lib/board-actions'

import emptyBoard from "@/public/images/undraw_add-notes_9xls.svg"
import Image from 'next/image'
const KanbanBoards = async () => {
  const session = await auth();

  if (!session) {
    redirect('/signin')
  }

  const boards = await getBoards() || []

  return (
    <section className='w-full h-full flex flex-col'>

        <div className="flex justify-between gap-4 items-center">
          <h1 className="font-bold text-[2rem] sm:text-[3rem] text-[#2A3370] tracking-tight">
          🐾 Your Boards 
          </h1>

          <CreateBoardForm />
        </div>

        <div className="relative w-full mt-4 h-full z-0">
          <div className="absolute inset-0 overflow-x-scroll pb-6 snap-x snap-mandatory">

            <div className="flex gap-4">
              {
                boards?.length > 0 ? (
                  boards?.map((board) => (
                    <KanbanBoard key={board.id} title={board.title} description={board.description} color={board.color} id={board.id} />
                  ))
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">

                    <div className="flex flex-col gap-2 items-center">
                      <Image src={emptyBoard} alt="Empty Board" width={200} height={200} />
                      <h2 className="text-lg text-gray-500 font-medium">You have no boards yet</h2>
                    </div>

                  </div>
                )
              }
              
            </div>

          </div>
        </div>
    </section>
  )
}

export default KanbanBoards