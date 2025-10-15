import React from "react";
import ProgressBar from "../ProgressBar";
import Link from "next/link";
import { BiCustomize } from "react-icons/bi";
import { BsEmojiSunglasses } from "react-icons/bs";
import { FaUmbrellaBeach, FaCarAlt } from "react-icons/fa";
import { GiLinkedRings } from "react-icons/gi";
import { TbHomeDollar } from "react-icons/tb";

export default function DashboardGoalCard({ goal }) {
  function displayIcon() {
    const goalIcon = goal.goalIcon;
    if (goalIcon === "Home") {
      return <TbHomeDollar />;
    } else if (goalIcon === "Wedding") {
      return <GiLinkedRings />;
    } else if (goalIcon === "Emergency Fund") {
      return <FaUmbrellaBeach />;
    } else if (goalIcon === "Car") {
      return <FaCarAlt />;
    } else if (goalIcon === "Vacation") {
      return <BsEmojiSunglasses />;
    } else if (goalIcon === "Custom") {
      return <BiCustomize />;
    }
  }
  return (
    <Link
      href={"/dashboard/goals"}
      className="border border-gray-200 py-2 px-6 w-full md:w-1/2 rounded-[10px] text-[#007787] transition-all duration-300 hover:shadow-md hover:border-[#00afa7]"
    >
      <div className="flex gap-2 items-center mb-4">
        <div className="text-xl">{displayIcon()}</div>
        <div className="text-xl">{goal.name}</div>
      </div>
      <ProgressBar value={(goal.savedSoFar / goal.goalAmount) * 100} />
      <div className="text-sm mb-4">
        ${parseFloat(goal.savedSoFar).toLocaleString()} saved so far
      </div>

      <div className="flex">
        <div className="flex-2">
          <div>
            <div className="text-2xl mb-1">
              $0 of {parseFloat(goal.savedSoFar).toLocaleString()}
            </div>
            <div className="text-sm">Contributed this month</div>
          </div>
        </div>
        <div className="flex-1">
          <div>
            <div className="text-2xl mb-1">
              ${Math.round(goal.goalAmount - goal.savedSoFar).toLocaleString()}
            </div>
            <div className="text-sm">Left to save</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
