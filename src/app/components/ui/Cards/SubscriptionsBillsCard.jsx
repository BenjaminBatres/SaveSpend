import Link from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function SubscriptionsBillsCard({ subscription, bill, budgetDataBill, budgetDataSubscription }) {
  return (
    <Link
      href="/dashboard/spendingplan"
      className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm 
                 flex flex-col justify-between transition-all duration-300 
                 hover:shadow-md hover:border-[#00afa7]"
    >
      <div className="flex justify-between items-center mb-2">
        <div
          className="h-8 w-8 bg-[#00bf91] flex justify-center items-center 
                        text-white rounded-md font-semibold text-sm"
        >
          {subscription?.name?.[0] || bill?.name?.[0] || budgetDataSubscription?.subscription[0] || budgetDataBill?.bill[0]}
        </div>
        <BsThreeDotsVertical className="text-gray-500" />
      </div>

      <div className="text-xl font-semibold text-[#2f4858] mb-1 truncate">
        {subscription?.name || bill?.name || budgetDataSubscription?.subscription || budgetDataBill?.bill}
      </div>
      <div className="text-[#007787]">${subscription?.cost || bill?.cost || budgetDataBill?.billCost || budgetDataSubscription?.subscriptionCost}</div>
    </Link>
  );
}
