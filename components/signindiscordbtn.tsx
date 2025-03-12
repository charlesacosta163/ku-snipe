import React from "react";
import { TbBrandDiscord } from "react-icons/tb";
import { linkDiscordAccount, isDiscordLinked } from "@/lib/actions";

// Make this a server component
const SignInDiscordBtn = async () => {
  // Check if Discord is linked
  const isLinked = await isDiscordLinked();

  if (isLinked) {
    return (
      <div className="flex gap-2 items-center font-medium bg-transparent text-gray-700  opacity-50">
        {" "}
        <TbBrandDiscord className="w-5 h-5" />
        Account linked
      </div>
    );
  }

  return (
    <form action={linkDiscordAccount}>
      <button
        type="submit"
        className="flex gap-2 items-center font-medium bg-[#7289da] text-white button"
      >
        <TbBrandDiscord className="w-5 h-5" />
        Link Discord Account
      </button>
    </form>
  );
};

export default SignInDiscordBtn;
