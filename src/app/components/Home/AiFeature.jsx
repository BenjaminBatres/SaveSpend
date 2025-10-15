import React from "react";
import AiFeatureImg from "../../assets/undraw_chat-bot_c8iw.svg";
import Image from "next/image";
import Link from "next/link";
export default function AiFeature() {
  return (
    <div className="py-10">
      <section className="bg-gradient-to-r from-[#d1fff3] to-[#e6fef9] py-20 px-6 text-center lg:text-left">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#2f4858] mb-5">
              Meet your <span className="text-[#00bf91]">AI assistant</span> for
              smarter finances
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-8">
              Powered by AI, it learns your habits, tracks your goals, and gives
              insights to help you spend wisely and save effortlessly.
            </p>
            <Link
              href="/get-started"
              className="py-4 px-8 bg-[#00bf91] text-white rounded-full hover:-translate-y-1 transition duration-300"
            >
              Try it now
            </Link>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src={AiFeatureImg}
              alt="AI assistant illustration"
              className="rounded-2xl max-w-[90%]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
