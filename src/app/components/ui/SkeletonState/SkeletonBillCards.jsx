import React from "react";
import SkeletonBox from "../SkeletonState/SkeletonBox";

export default function SkeletonBillCards({ billCards }) {
  return Array(billCards)
    .fill(0)
    .map((_, id) => (
      <div
        className="border border-gray-200 p-2 rounded-lg shadow-sm mb-2 lg:mb-0"
        key={id}
      >
        <SkeletonBox width={"24px"} height={"24px"} marginBottom={"8px"} />
        <SkeletonBox width={"100px"} height={"18px"} marginBottom={"8px"} />
        <SkeletonBox width={"70px"} height={"18px"} />
      </div>
    ));
}
