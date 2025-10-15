import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import GoalInput from "../../ui/Inputs/GoalInput"

export default function NewGoalModal({ setIsOpen }) {
    const [isGoal, setIsGoal] = useState(false);
  
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-71">
      <div className="relative max-w-[550px] w-[90%] sm:w-full mx-auto bg-white rounded-xl animate-slide-up sm:-translate-y-20">
        <div className="flex justify-between items-center border-b border-gray-300 p-4">
          {isGoal && (
            <button onClick={() => setIsGoal(!isGoal)}>
              <IoMdArrowRoundBack className="text-xl cursor-pointer" />
            </button>
          )}
          <div className="text-xl font-semibold text-gray-800">
            Create a goal
          </div>
          <button
            className="bg-[#00afa7]/50 rounded-full text-white hover:bg-[#00afa7] transition-all duration-300 text-2xl cursor-pointer "
            onClick={() => setIsOpen(false)}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="px-5 py-6">
          <div className="text-center font-semibold text-lg">
            What are you saving for?
          </div>
          <GoalInput setIsOpen={setIsOpen} isGoal={isGoal} setIsGoal={setIsGoal}/>
        </div>
      </div>
    </div>
  );
}
