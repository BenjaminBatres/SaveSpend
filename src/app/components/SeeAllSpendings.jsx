import Link from "next/link";
import React from "react";

export default function SeeAllSpendings({title}) {
  return (
    <Link
      href={"/dashboard/spendingplan"}
      className="w-full block text-center bg-gray-100 text-[#007787] border border-gray-200 mt-2.5 py-1 hover:bg-[#00afa7]/10 transition-all duration-300"
    >
      <span className="font-semibold">See All {title}</span>
    </Link>
  );
}
