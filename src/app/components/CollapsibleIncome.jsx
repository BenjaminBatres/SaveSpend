import React, { useState } from "react";
import UpdateIncomeModal from "../components/ui/Modals/UpdateIncomeModal";
import { IoMdArrowDropright } from "react-icons/io";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import SignUpModal from "../components/ui/Modals/SignUpModal"

export default function CollapsibleIncome({ income, userIncomeId, budgetDataIncome, isLogin }) {
  const [active, setActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userIncome = income.join("")
  return (
    <div className="bg-[#00afa7] py-3 rounded-[5px] mb-4 ">
      <div className="flex items-center justify-between px-[10px]">
        <div className="flex items-center cursor-pointer">
          <IoMdArrowDropright
            onClick={() => setActive(!active)}
            className={`text-2xl text-white ${
              active
                ? "rotate-90 h-6 w-6 max-w-6 transform transition-all duration-300"
                : "h-6 w-6 max-w-6 transform transition-all duration-300"
            }`}
          />
          <div
            className="text-white text-lg font-semibold"
            onClick={() => setActive(!active)}
          >
            Income
          </div>
          {active && (
            <>
              <button
                className="ml-6 text-sm font-semibold text-[#2f4858] hidden lg:flex items-center gap-2 cursor-pointer animate-fade-in"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <span className="text-lg">
                  <AiFillPlusCircle />
                </span>
                Update Income
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-white sm:text-lg font-semibold">
            ${(parseFloat(userIncome || budgetDataIncome || 0).toLocaleString(undefined, {minimumFractionDigits: 2,}))}
          </div>
          <div
            className="text-lg font-semibold cursor-pointer text-white"
            onClick={() => setActive(!active)}
          >
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>
      <div className="px-[10px] max-h-[225px]">
        <div
          className={`relative h-0 overflow-hidden transform transition-[height] duration-300 ease cursor-pointer lg:hidden ${
            active ? "h-[55px] mt-3" : "h-0"
          }`}
        >
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className={`bg-[#2f4858] w-full px-2 py-3 rounded-[5px] cursor-pointer flex items-center gap-2 font-semibold text-white`}
          >
            <div className="text-xl">
              <AiFillPlusCircle />
            </div>
            <div>Update Income</div>
          </button>
        </div>
      </div>
      {isLogin ? (
        <>
        {isModalOpen && (
          <UpdateIncomeModal
            setIsModalOpen={setIsModalOpen}
            userIncomeId={userIncomeId}
          />
        )}
        </>
      ) : (
        <>
        {isModalOpen && <SignUpModal onClose={setIsModalOpen}/>}
        </>
      )}
    </div>
  );
}
