"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function NavBar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="h-20">
      <nav
        className={`w-full top-0 z-50 transition-colors duration-300 max-w-[1440px] mx-auto 
        ${
          isSticky
            ? "fixed right-[50%] translate-x-[50%] bg-white shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="px-4 py-[18px] h-20 flex justify-between items-center">
          <div className="text-4xl sm:text-6xl text-[#00bf91] tracking-tighter">
            SaveSpend
          </div>
          <Link href={'/get-started'} className="py-3 px-6 bg-[#00bf91] rounded-[50px] text-lg text-white tracking-tighter transition duration-300 hover:-translate-y-1">
            Get started
          </Link>
        </div>
      </nav>
    </div>
  );
}
