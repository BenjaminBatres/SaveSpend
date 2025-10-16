"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
// Components
import SidebarGroup from "./SidebarGroup";
import SidebarIcon from "./SidebarIcon";
// Icons 
import Logo from "../../../assets/SaveSpend-logo.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { PiChartLineUp } from "react-icons/pi";
import { PiChartBarLight } from "react-icons/pi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { LuChartPie } from "react-icons/lu";
import { RiChatAiLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const groups = [
    {
      icons: [LuLayoutDashboard],
      labels: ["Dashboard"],
      links: ["/dashboard"], // route for each icon
    },
    {
      icons: [MdOutlineMonetizationOn, GoGoal, RiChatAiLine],
      labels: ["Spending Plan", "Goals", "AI Assistant"],
      links: [
        "/dashboard/spendingplan",
        "/dashboard/goals",
        "/dashboard/ai",
      ],
    },
    // {
    //   icons: [PiChartBarLight, AiOutlineFileSearch, LuChartPie],
    //   labels: ["Reports", "Search", "Analytics"],
    //   links: [
    //     "/dashboard/reports",
    //     "/dashboard/search",
    //     "/dashboard/analytics",
    //   ],
    // },
  ];

  return (
    <>
      <div className="hidden lg:flex flex-col fixed left-0 top-0 z-70 h-full lg:w-[70px] py-4 shadow-xl ">
        <Link href={"/dashboard"} className="mb-7 px-3">
          <Image src={Logo} alt="logo" className="rounded-[50%]"></Image>
        </Link>
        {groups.map((group, id) => (
          <SidebarGroup
            key={id}
            icons={group.icons}
            labels={group.labels}
            links={group.links}
          />
        ))}
      </div>

      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full flex justify-between items-center bg-[#00bf91] text-white px-4 py-3 shadow-md z-50">
        <button onClick={() => setOpen(!open)} className="text-2xl">
          {open ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>
        <div className="font-bold text-lg">SaveSpend</div>
      </div>

      {/* Mobile Slide Menu */}

      <div
        className={`lg:hidden fixed top-0 left-0 h-full bg-white shadow-lg z-40 transform transition-transform duration-500 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col items-start p-6 space-y-6 mt-12">
          <Link href={"/"} className="mb-5 px-3">
            <Image
              src={Logo}
              alt="logo"
              className="rounded-[50%] w-[70px]"
            ></Image>
          </Link>
          {groups.flatMap((group, gIndex) =>
            group.icons.map((Icon, iIndex) => (
              <SidebarIcon
                key={`${gIndex}-${iIndex}`}
                Icon={Icon}
                label={group.labels[iIndex]}
                link={group.links[iIndex]}
              />
            ))
          )}
        </div>
      </div>
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
