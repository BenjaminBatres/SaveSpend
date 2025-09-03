import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { TbTargetArrow } from "react-icons/tb";
import { TbPigMoney } from "react-icons/tb";
import { FaChartPie } from "react-icons/fa";

export default function Features() {
  const offers = [
    {
      icon: <GiReceiveMoney />,
      title: "Income:",
      descripition: "You choose where your money should go",
    },
    {
      icon: <TbTargetArrow />,
      title: "Goals:",
      descripition: "What matters most to you",
    },
    {
      icon: <TbPigMoney />,
      title: "Budget:",
      descripition: "Recurring and one-time purchases",
    },
    {
      icon: <FaChartPie />,
      title: "Categories:",
      descripition: "Dedicate your percentage",
    },
  ];
  return (
    <div className="max-w-[1440px] w-full m-auto">
      <div className="sm:py-10 px-3">
        <div className="text-[32px] md:text-[36px] lg:text-5xl text-center tracking-tight mb-6">
          See where you stand and how you can do better.
        </div>

        <div className="flex flex-wrap items-center gap-[30px] md:items-start justify-center md:justify-evenly mt-[56px] lg:mt-[80px] mb-[56px]">
          {offers.map((offer, id) => (
            <div
              className="flex pl-3 sm:pl-0 flex-col w-[100%] sm:w-[35%] md:w-[15%]"
              key={id}
            >
              <div className="flex md:flex-col items-center md:items-start">
                <div className="text-[#00bf91] text-3xl md:text-4xl mb-6 mr-4">
                  {offer.icon}
                </div>
                <div className="font-semibold text-xl mb-2">{offer.title}</div>
              </div>
              <div className="max-w-full md:max-w-[215px] mb-4">
                {offer.descripition}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
