import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { signOutFromGoogle } from "@/lib/actions";

const ProfileButton = ({image, name}: {image: string, name: string}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none"><img src={image} alt="Profile Image" width={30} height={30} className='rounded-full'/></button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 mr-4">
        <div className="font-medium text-gray-500 text-sm text-center py-2 px-1 flex gap-2 items-center"><User className="w-4 h-4"/>{name}</div>
        <hr />
        <form action={signOutFromGoogle}>
            <button type="submit" className="w-full text-red-400 font-medium hover:text-white hover:bg-red-400 flex gap-2 text-sm duration-200 rounded px-2 py-1 items-center"><LogOut className="rotate-180"/> Log Out</button>     
        </form> 
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
