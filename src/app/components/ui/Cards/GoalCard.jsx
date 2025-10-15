import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import UpdateGoalModal from "../Modals/UpdateGoalModal";
import { FaCarAlt } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";
import { BsEmojiSunglasses } from "react-icons/bs";
import { TbHomeDollar } from "react-icons/tb";
import { GiLinkedRings } from "react-icons/gi";
import { BiCustomize } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
export default function GoalCard({ goal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const date = new Date(goal.targetDate);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  function displayIcon() {
    if (goal.goalIcon === "Home") {
      return <TbHomeDollar />;
    } else if (goal.goalIcon === "Wedding") {
      return <GiLinkedRings />;
    } else if (goal.goalIcon === "Emergency Fund") {
      return <FaUmbrellaBeach />;
    } else if (goal.goalIcon === "Car") {
      return <FaCarAlt />;
    } else if (goal.goalIcon === "Vacation") {
      return <BsEmojiSunglasses />;
    } else if (goal.goalIcon === "Custom") {
      return <BiCustomize />;
    }
  }

  function handleEditClick(goal) {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  }

  return (
    <div
      className="border border-gray-300 bg-white rounded-lg p-3"
      onClick={() => handleEditClick(goal)}
    >
      <div className="flex justify-between">
        <div className="flex gap-1">
          <div className="text-2xl">{displayIcon()}</div>
          <div className="text-xl mb-4 tracking-tight">{goal.name}</div>
        </div>
        <BsThreeDotsVertical className="text-xl cursor-pointer" />
      </div>
      <ProgressBar value={(goal.savedSoFar / goal.goalAmount) * 100} />
      <div className="text-[15px] mb-4">
        ${parseFloat(goal.savedSoFar).toLocaleString()} saved so far
      </div>
      <div className="border-t border-gray-300 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#00bf91] rounded-[2px]"></div>
            <div className="text-sm">
              Available ${Math.round(parseFloat(goal.savedSoFar))}
            </div>
          </div>
          <div className="text-[15px] font-semibold">
            Goal ${parseFloat(goal.goalAmount).toLocaleString()}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#0074af] rounded-[2px]"></div>
            <div className="text-sm">Spent $0</div>
          </div>
          <div className="text-xs font-semibold">
            Target {month + " " + year}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#3f5d9a] rounded-[2px]"></div>
            <div className="text-sm">
              Left to save $
              {Math.round(goal.goalAmount - goal.savedSoFar).toLocaleString()}
            </div>
          </div>
          <div
  className={`text-sm font-semibold transition-colors duration-300 ${
    goal.goalAmount - goal.savedSoFar <= 0
      ? "text-green-600"
      : (goal.savedSoFar / goal.goalAmount) * 100 >= 90
      ? "text-emerald-500"
      : (goal.savedSoFar / goal.goalAmount) * 100 >= 50
      ? "text-blue-500"
      : "text-gray-600"
  }`}
>
  {goal.goalAmount - goal.savedSoFar <= 0 ? (
    <>🎉 Completed!</>
  ) : (goal.savedSoFar / goal.goalAmount) * 100 >= 90 ? (
    <>🔥 Almost There!</>
  ) : (goal.savedSoFar / goal.goalAmount) * 100 >= 50 ? (
    <>💪 Halfway There!</>
  ) : (
    <>🚀 You Can Do This!</>
  )}
</div>



        </div>
      </div>
      {selectedGoal && (
        <UpdateGoalModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          selectedGoal={selectedGoal}
        />
      )}
    </div>
  );
}
