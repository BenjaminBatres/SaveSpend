import Link from "next/link";
import React from "react";

export default function AddPlannedSpendings() {
  return (
    <Link
      href={"/dashboard/spendingplan"}
      className="p-2 shadow-lg rounded-[5px] border border-gray-200 flex items-center justify-center bg-gray-100 text-[#007787] h-24 sm:h-32
             hover:bg-[#00afa7]/10 transition-all duration-300"
    >
      <span className="text-lg font-medium text-center">Add Planned Spending</span>
    </Link>
  );
}
