import React from "react";
import AiFeatureImg from "../assets/AI-Feature-img.jpg";
import Image from "next/image";
export default function AiFeature() {
  return (
    <div className="py-10">
      <div className="bg-[#388168] py-25 px-6">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="md:w-[85%] lg:w-[50%] px-3 md:px-6 lg:px-3 ">
              <div className="text-[36px] lg:text-5xl mb-6 text-white lg:max-w-[450px] ">
                Get as much or as little help{" "}
                <span className="font-semibold">as you need</span>
              </div>
              <div className="mb-4 text-lg lg:text-xl text-white lg:max-w-[450px]">
                Your personal finance assistant uses AI to analyze your income
                and spending patterns, helping you make smarter money decisions.
                Instead of just showing numbers, the insights card summarizes
                where your money is going, highlights unusual changes in your
                habits, and gives personalized suggestions to save more
                effectively.
              </div>
              <button className="py-[14px] px-[26px] text-white bg-[#00bf91] rounded-[8px]">
                Get started
              </button>
            </div>
            <div className="lg:w-[50%] pl-3">
              <Image
                src={AiFeatureImg}
                className="border-3 rounded-2xl border-[#00bf91] mt-8 lg:mt-0"
                alt="ai-feature-img"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
