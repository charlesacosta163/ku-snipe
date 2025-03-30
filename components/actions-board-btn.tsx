"use client";

import React, { useState } from "react";
import { Ellipsis, Plus, FilePenLine, Trash2 } from "lucide-react";
import { ALL_BOARD_COLORS } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Form from "next/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { deleteBoard, updateBoard } from "@/lib/board-actions";
import { toast } from "sonner";

const ActionsBoardBtn = ({
  boardId,
  title,
  description,
  color,
}: {
  boardId: string;
  title: string;
  description: string;
  color: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [boardName, setBoardName] = useState(title);
  const [boardDescription, setBoardDescription] = useState(description);
  const [boardColor, setBoardColor] = useState(color);

  const colorClass = ALL_BOARD_COLORS.find(c => c.name === boardColor)?.color;
  const taskColor = ALL_BOARD_COLORS.find(c => c.name === boardColor)?.taskColor;

  const handleDeleteBoard = async () => {
    const result = await deleteBoard(boardId);
    if (result?.success) {
      toast.success(result.message);
    } else {
      toast.error(result?.message || "Failed to delete board");
    }
  };

  const handleUpdateBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await updateBoard(
      boardId,
      boardName,
      boardDescription,
      boardColor
    );
    
    if (result?.success) {
      toast.success("Board updated successfully");
      setIsEditing(false); // Close dialog when successful
    } else {
      toast.error(result?.message || "Failed to update board");
    }
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* Edit Board - Add onClick handler */}
          <DropdownMenuItem 
            className="flex items-center gap-2"
            onClick={() => setIsEditing(true)}
          >
            <FilePenLine className="w-4 h-4" />
            Edit Board
          </DropdownMenuItem>
          {/* Delete Board */}
          <DropdownMenuItem
            onClick={handleDeleteBoard}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Board
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent style={{ backgroundColor: colorClass }}>
          <DialogHeader>
            <DialogTitle>Edit Board</DialogTitle>
            <DialogDescription>
              Make changes to your board and save when done.
            </DialogDescription>
          </DialogHeader>
          
          <Form className="flex flex-col gap-4" action={handleUpdateBoard}>
            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="board-name" className="text-sm font-semibold">
                Board Name
              </label>
              <input
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                type="text"
                id="board-name"
                className="w-full px-4 py-2 rounded-md text-sm font-medium bg-white"
                name="board-name"
                placeholder="Board Name"
                required
                style={{ backgroundColor: taskColor }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="board-description"
                className="text-sm font-semibold"
              >
                Board Description
              </label>
              <input
                value={boardDescription}
                onChange={(e) => setBoardDescription(e.target.value)}
                type="text"
                id="board-description"
                className="w-full px-4 py-2 rounded-md text-sm font-medium bg-white"
                name="board-description"
                placeholder="Board Description"
                required
                style={{ backgroundColor: taskColor }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="board-color" className="text-sm font-semibold">
                Board Color
              </label>
              <Select 
                defaultValue={boardColor} 
                onValueChange={(value) => setBoardColor(value)}
              >
                <SelectTrigger style={{ backgroundColor: taskColor, border: 'none'}}>
                  <SelectValue  placeholder="Select a color" />
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

            <button
              type="submit"
              className="button self-end bg-blue-500 text-white"
            >
              Update Board
            </button>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionsBoardBtn;
