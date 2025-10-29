import Link from "next/link";
import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

export default function page() {
  return (
    <>
      <header className="h-20 flex items-center justify-center sm:py-11 border-b-2 border-gray-200">
        <Link
          href={"/"}
          className="text-4xl sm:text-6xl text-[#00bf91] tracking-tighter "
        >
          SaveSpend
        </Link>
      </header>
      <div className="flex justify-center px-4 pb-[104px] mt-4 mb-2.5">
        <div className="flex h-full w-full max-w-[390px] flex-col justify-between rounded-lg bg-[#e6efff] px-6 pt-4 pb-8">
          <div className="mb-6">
            <div>
              <div className="text-center text-[30px] font-semibold text-[#00bf91]">
                1 000 000+ people
              </div>
              <p className="text-center text-[16px] text-[#2f4858]">
                aleady using SaveSpend
              </p>
            </div>
            <div className="mt-6 flex flex-col rounded-lg bg-[#fff] px-3 pt-6 pb-4">
              <div className="relative px-5 text-center text-base font-extrabold leading-6">
                <RiDoubleQuotesL className="absolute -top-2 left-0 fill-[#00bf91]" />
                <p className="text-center text-[#2f4858]">
                  Whether it’s spotting a rise in food spending, comparing your
                  monthly savings, or suggesting budget adjustments, this card
                  turns raw data into actionable advice.
                </p>
                <RiDoubleQuotesR className="absolute -bottom-2 right-0 fill-[#00bf91]" />
              </div>
              <div className="mx-auto mt-2">
                <p className="text-[#2f4858]">—Doug (Trustpilot)</p>
              </div>
            </div>
          </div>
          <p className="text-center">⭐⭐⭐⭐⭐</p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[400px] fixed bottom-0 left-0 right-0 z-10">
        <div className="flex flex-col px-4 py-6 bg-transparent">
            <Link href={'/quiz'} className="relative w-full rounded-[8px] p-4 transition-all bg-[#00bf91]">
            <div className="text-white font-semibold text-center uppercase">Continue</div>
            </Link>
        </div>
      </div>
    </>
  );
}
