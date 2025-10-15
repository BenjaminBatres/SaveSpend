import Link from "next/link";
import React from "react";

export default function AddSubscripitonBillCard({ title }) {
  return (
    <Link
      href="/dashboard/spendingplan"
      className="h-24 sm:h-34 sm:w-50 flex items-center justify-center gap-2 px-4 py-3 
             bg-gray-100 text-[#007787] rounded-xl border border-gray-200 
             hover:bg-[#00afa7]/10 transition-all duration-300"
    >
      <span className="text-lg font-medium">Add {title}</span>
    </Link>
  );
}
