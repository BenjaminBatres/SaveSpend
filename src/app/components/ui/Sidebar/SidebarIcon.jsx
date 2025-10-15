import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarIcon({ Icon, label, link }) {
  const pathname = usePathname()
  return (
    <Link href={`${link}`}  className={`relative group lg:w-full h-8 flex items-center hover:text-[#00bf91] transition-all duration-300 cursor-pointer ${pathname === link ? 'lg:bg-gray-300 text-[#00bf91]' : '' }`}>
      <div className={`w-[3px] h-full mr-4 lg:w-0 lg:mr-0 ${pathname === link ? 'bg-[#00bf91]' : 'bg-transparent'}`}></div>
      <Icon className=" text-xl lg:text-base h-6 text-[#00bf91] lg:w-full" />
      <div
        className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden lg:group-hover:block 
        bg-gray-800 text-xs text-white px-2 py-1 rounded shadow-lg whitespace-nowrap "
        >
        {label}
      </div>
  
      <div className="ml-3 lg:hidden">{label}</div>
    </Link>
  );
}
