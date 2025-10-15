import React, { useState } from "react";
// Input Compoments
import BillsInput from "../Inputs/BillsInput";
import SubscriptionInput from "../Inputs/SubscriptionInput";
import GoalInput from "../Inputs/GoalInput";
// Icons
import { BsEnvelopePlus } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";

export default function AddBillModal({
  setIsModalOpen,
  isModalOpen,
  title,
  subTitle,
}) {
  const icons = [
    <RiBillLine />,
    <BsEnvelopePlus />,
    <GiTakeMyMoney className="text-[#00afa7] text-6xl" />,
  ];
  const [isGoal, setIsGoal] = useState(false);

  return (
    <div
      className={
        "fixed inset-0 bg-black/30 flex items-center justify-center z-90 text-black"
      }
    >
      <div
        className={`relative max-w-[550px] w-[95%] sm:w-full mx-auto bg-white rounded-xl animate-slide-up ${
          title === "Savings Goal" ? "-translate-y-6.5" : "-translate-y-30"
        }`}
      >
        <div className="flex justify-between items-center p-4 rounded-t-xl border-b border-gray-300">
          {isGoal && (
            <button onClick={() => setIsGoal(!isGoal)}>
              <IoMdArrowRoundBack className="text-xl cursor-pointer" />
            </button>
          )}
          <div className="text-lg text-gray-700 font-semibold">Add {title}</div>
          <div
            className="text-gray-500 hover:text-gray-700 rounded-full text-2xl cursor-pointer"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <IoMdClose />
          </div>
        </div>
        <div
          className={`flex flex-col sm:flex-row ${
            subTitle === "Goal" ? "py-3" : "py-6"
          } px-4 gap-2 sm:gap-0`}
        >
          <div
            className={`${
              subTitle === "Goal" ? "hidden" : "sm:w-[20%] flex justify-center"
            }`}
          >
            <div className="text-4xl">
              {subTitle === "List your bills"
                ? icons[0]
                : subTitle === "List your subscriptions"
                ? icons[1]
                : ""}
            </div>
          </div>
          <div className={`${subTitle === "Goal" ? "w-full" : "sm:w-[80%]"}`}>
            {subTitle === "List your bills" ? (
              <BillsInput
                subTitle={subTitle}
                isStep={false}
                setIsModalOpen={setIsModalOpen}
              />
            ) : subTitle === "List your subscriptions" ? (
              <SubscriptionInput
                subTitle={subTitle}
                isStep={false}
                setIsModalOpen={setIsModalOpen}
              />
            ) : (
              <>
                <div className="text-center text-gray-700 font-semibold text-lg">
                  What are you saving for?
                </div>
                <GoalInput
                  setIsModalOpen={setIsModalOpen}
                  isGoal={isGoal}
                  setIsGoal={setIsGoal}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
