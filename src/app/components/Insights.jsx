"use client";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import InsightsImages from "./ui/InsightImages";
import InsightsDescription from "./ui/InsightDescription";

export default function Insights() {
  const [active, setActive] = useState(0);
  const insightsDescriptions = [
    {
      title: "Know where your money is going",
      description:
        "Use custom categories to understand your spending habits, see where your money is going, and plan ahead.",
    },
    {
      title: "Never get caught by surprise",
      description:
        "Get up-to-the-minute numbers that adjust as you spend — so you always know where you stand.",
    },
    {
      title: "Set goals that keep you motivated",
      description:
        "Make goal-setting part of your budget. Plan to pay off debt, save for a big purchase, or stash away for a rainy day.",
    },
    {
      title: "Treat yourself — with confidence",
      description:
        "When you know what’s left after your needs are covered, you can throw down your card without a care in the world.",
    },
  ];

  return (
    <div className="max-w-[1440px] w-full m-auto ">
      <div className="px-6">
        <div className="py-6 lg:py-10">
          <div className="text-[32px] md:text-[36px] lg:text-5xl text-center tracking-tight mb-6">
            Constantly <span className="text-[#00bf91]">on course.</span> Never
            fall behind.
          </div>
          <div className="text-[19px] text-center pt-[19px]">
            Determine your goal and work toward achieving it.
          </div>
        </div>
        <div className="py-6 lg:py-10">
          <div className="flex flex-col items-center lg:items-start lg:flex-row ">
            <div className="pb-[35px] lg:w-[50%] flex justify-center flex-col ">
              {insightsDescriptions.map((insight, index) => (
                <InsightsDescription
                  key={index}
                  insight={insight}
                  setActive={setActive}
                  active={active}
                  index={index}
                />
              ))}
            </div>
            <div className="hidden lg:block w-[50%]">
              <AnimatePresence mode="wait">
                <InsightsImages key={active} active={active} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
