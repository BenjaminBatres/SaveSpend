"use client";
import Link from "next/link";
import React from "react";
import CompletedImage from "../../assets/undraw_completing_3pe7.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  return (
    <>
      <header className="h-20 flex items-center justify-center sm:py-11 border-b-2 border-gray-200">
        <Link
          href={"/"}
          className="text-4xl sm:text-6xl text-[#00bf91] tracking-tighter"
        >
          SaveSpend
        </Link>
      </header>
      <div className="mx-auto flex h-full max-w-100 flex-col space-y-6 px-4 py-6 sm:max-w-[580px]">
        <div className="space-y-2 mx-auto max-w-[500px] sm:pb-2 sm:pt-4 lg:pb-4 lg:pt-8">
          <div className="text-center font-semibold text-[#2f4858] text-2xl">
            You're all set!
          </div>
          <div className="text-center text-[#2f4858]">
            We’ve used your inputs to personalize your dashboard. You can now
            track your savings and goals in one place.
          </div>
        </div>
        <Image
          src={CompletedImage}
          alt="Completed"
          className="w-72 mx-auto"
          priority
        />
        <div className="mx-auto w-full max-w-100 fixed bottom-0 left-0 right-0 z-10">
          <div className="flex flex-col px-4 py-6 bg-transparent">
            <button
              onClick={() => router.push("/dashboard")}
              className="relative w-full rounded-[8px] p-4 transition-all bg-[#00bf91] cursor-pointer"
            >
              <div className="text-white font-semibold text-center uppercase">
                Continue
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
