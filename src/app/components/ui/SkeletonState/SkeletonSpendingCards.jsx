import React from "react";
import SkeletonBox from "./SkeletonBox";

export default function SkeletonSpendingCards({ spendingCards }) {
  return Array(spendingCards)
    .fill(0)
    .map((_, id) => (
      <div
        className="p-2 shadow-lg rounded-[5px] border border-gray-200"
        key={id}
      >
        <SkeletonBox width={75} height={18} marginBottom={8} />
        <SkeletonBox width={50} height={18} marginBottom={8} />
        <SkeletonBox
          width={"100%"}
          height={24}
          marginBottom={8}
          borderRadius={8}
        />
        <div className="flex justify-between">
          <SkeletonBox width={95} height={18} />
          <SkeletonBox width={70} height={18} />
        </div>
      </div>
    ));
}
