import React from "react";
import { PiSignOutFill } from "react-icons/pi";
import Link from "next/link";
import { GoGear } from "react-icons/go";
import { usePathname } from "next/navigation";

export default function BottomSidebarIcons({ setIsOpen }) {
  const pathname = usePathname();
  return (
    <div className="space-y-6 lg:space-y-2">
      <Link
        href={"/dashboard/settings"}
        className={`relative group lg:w-full h-8 flex items-center hover:text-[#00bf91] transition-all duration-300 ${
          pathname === "/dashboard/settings"
            ? "lg:bg-gray-300 text-[#00bf91]"
            : ""
        }`}
      >
        <div className={`w-[3px] h-full mr-4 lg:w-0 lg:mr-0`}></div>
        <GoGear className="text-xl lg:text-base h-6 text-[#00bf91] lg:w-full" />
        <div
          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden lg:group-hover:block 
        bg-gray-800 text-xs text-white px-2 py-1 rounded shadow-lg whitespace-nowrap border"
        >
          Settings
        </div>
        <div className="ml-3 lg:hidden">Settings</div>
      </Link>
      <button
        className="flex relative group lg:w-full h-8 items-center hover:text-[#00bf91] transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <div className={`w-[3px] h-full mr-4 lg:w-0 lg:mr-0`}></div>
        <PiSignOutFill className="text-xl lg:text-base h-6 text-[#00bf91] lg:w-full" />
        <div
          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden lg:group-hover:block 
        bg-gray-800 text-xs text-white px-2 py-1 rounded shadow-lg whitespace-nowrap border"
        >
          Sign Out
        </div>
        <div className="ml-3 lg:hidden">Sign Out</div>
      </button>
    </div>
  );
}
