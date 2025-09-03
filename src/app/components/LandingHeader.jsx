import Image from "next/image";
import React from "react";
import BudgetImg from "../assets/freepik__the-style-is-candid-image-photography-with-natural__11031.png";

export default function LandingHeader() {
  return (
    <div className="max-w-[1440px] w-full m-auto">
      <div className="pb-10">
        <div className="bg-[#cafbe7] rounded-2xl">
          <div className="flex flex-col items-center lg:flex-row py-8 sm:px-6 lg:py-16">
            <div className="lg:pl-[100px] xl:pr-[70px] flex flex-col items-center lg:items-start justify-center max-w-[90%] mb-5 lg:mb-0">
              <div className="text-[40px] xl:text-[54px] text-center lg:text-left font-semibold tracking-tight mb-4 lg:mb-5">
                The smart way to manage your{" "}
                <span className="text-[#00bf91]">money</span>
              </div>
              <div className="py-6 xl:pr-[80px] text-lg text-center lg:text-left xl:text-[22px]">
                Get a custom budget, see where your money is going, and always
                know what you can spend or save.
              </div>
              <button className="py-5 px-8 bg-[#00bf91] text-white rounded-[50px] lg:text-xl cursor-pointer">
                Get started
              </button>
            </div>
            <div className="max-w-[70%] lg:max-w-[50%]">
              <figure className="lg:pr-12">
                <Image
                  src={BudgetImg}
                  alt="img"
                  className="rounded-[5%] transform transition-all ease duration-[0.5s] w-full lg:w-[85%]"
                ></Image>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
