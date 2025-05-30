'use client'

import { usePathname } from "next/navigation";

const PageName = () => {
    const pathname = usePathname();

    const lastSegment = pathname.split('/').pop() || '';
    const pageName = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    return <h1 className="font-large hidden md:block text-[#2A3370]">{pageName}</h1>
}

export default PageName;