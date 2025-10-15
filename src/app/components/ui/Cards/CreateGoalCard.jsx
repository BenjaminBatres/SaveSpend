import Link from "next/link";
import { TbPigMoney } from "react-icons/tb";

export default function CreateGoalCard() {
  return (
    <div className="border border-gray-200 py-2 px-6 w-full md:w-1/2 rounded-[10px] flex flex-col justify-center items-center gap-4 h-[200px]">
      <TbPigMoney className="text-3xl sm:text-4xl text-[#007787]" />
      <div className="flex flex-col-reverse md:flex-col items-center gap-4">
        <div className="text-[#007787] text-center text-lg">
          Put money aside for things you value.
        </div>
        <Link
          href={"/dashboard/goals"}
          className="text-[#007787] text-lg md:text-base border rounded-2xl py-1 px-3 hover:bg-[#007787] hover:text-white transition-all duration-350 ease"
        >
          Create Goal
        </Link>
      </div>
    </div>
  );
}
