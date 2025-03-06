import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { signOutFromGoogle } from "@/lib/actions";

const ProfileButton = ({image, name, tier}: {image: string, name: string, tier: string}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none"><img src={image} alt="Profile Image" width={30} height={30} className='rounded-full'/></button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 mr-4">
        <div className="flex flex-col gap-0.5">
          <div className="font-medium text-gray-500 text-sm text-center pt-2 pb-1 px-1 flex gap-2 items-center"><User className="w-4 h-4"/>{name}</div>

        <div className={`text-[10px] font-semibold px-2 py-0.5 mb-2 self-center rounded-full ${
                          tier === "scout"
                            ? "text-gray-700 bg-gray-200"
                            : tier === "sharpshooter"
                            ? "text-blue-700 bg-blue-100"
                            : tier === "elite"
                            ? "text-white bg-black"
                            : ""
                        }`}>{tier.toUpperCase()}</div>
        </div>
      
        <hr />
        <form action={signOutFromGoogle}>
            <button type="submit" className="w-full text-red-400 font-medium hover:text-white hover:bg-red-400 flex gap-2 text-sm duration-200 rounded px-2 py-1 items-center"><LogOut className="rotate-180"/> Log Out</button>     
        </form> 
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
