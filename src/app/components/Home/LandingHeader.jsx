import Image from "next/image";
import React from "react";
import BudgetImg from "../../assets/undraw_transfer-money_h9s3.svg";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <div className="max-w-[1440px] w-full mx-auto">
      <div className="pb-10">
        <div className="bg-gradient-to-r from-[#d1fff3] to-[#e6fef9] rounded-2xl shadow-sm">
          <div className="flex flex-col lg:flex-row items-center py-12 px-6 lg:px-16">
            <div className="flex flex-col items-center lg:items-start lg:w-1/2 text-center lg:text-left">
              <h2 className="text-[42px] lg:text-[54px] font-semibold tracking-tight mb-4">
                Take control of your{" "}
                <span className="text-[#00bf91]">finances</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-md">
                Visualize your spending habits, track goals, and grow your
                savings with ease.
              </p>
              <Link
                href="/get-started"
                className="py-4 px-8 bg-[#00bf91] text-white rounded-[40px] text-lg hover:bg-[#019c78] transition transform hover:-translate-y-1"
              >
                Start Free
              </Link>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
              <Image
                src={BudgetImg}
                alt="Dashboard preview"
                className="rounded-2xl shadow-lg w-[80%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
