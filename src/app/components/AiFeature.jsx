import React from "react";
import AiFeatureImg from "../assets/undraw_chat-bot_c8iw.svg";
import Image from "next/image";
import Link from "next/link";
export default function AiFeature() {
  return (
    <div className="py-10">
      <div className="bg-gradient-to-r from-[#eaf8ff] to-[#e3fff6] py-20 px-6">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="md:w-[85%] lg:w-[50%] px-3 md:px-6 lg:px-3">
              <div className="text-[36px] lg:text-5xl mb-6 text-[#2f4858] lg:max-w-[450px] ">
                Get as much or as little help{" "}
                <span className="font-semibold">as you need</span>
              </div>
              <div className="mb-5 text-lg lg:text-xl text-gray-800 lg:max-w-[460px] leading-relaxed">
                Stay one step ahead of your expenses. Our smart budget tracking
                shows what’s coming next — from upcoming bills to spending
                trends — so you can plan confidently and avoid financial
                surprises.
              </div>
              <Link
                href={"/get-started"}
                className="inline-block py-[14px] px-[26px] text-white bg-[#00bf91] rounded-[8px] shadow-md hover:-translate-y-1 transition-transform duration-300"
              >
                Get started
              </Link>
            </div>

            <div className="lg:w-[50%] pl-3 mt-10 lg:mt-0 flex justify-center">
              <Image
                src={AiFeatureImg}
                alt="illustration"
                className="w-[80%] max-w-[450px] rounded-2xl transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
