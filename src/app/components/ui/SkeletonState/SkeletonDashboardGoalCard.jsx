import React from "react";
import SkeletonBox from "./SkeletonBox";

export default function SkeletonDashboardGoalCard({ goalCards }) {
  return Array(goalCards)
    .fill(0)
    .map((_, id) => (
      <div
        className="border border-gray-200 py-2 px-6 w-full md:w-1/2 rounded-[10px]"
        key={id}
      >
        <SkeletonBox width={150} height={26} marginBottom={16} />
        <SkeletonBox
          width={"100%"}
          height={28}
          marginBottom={8}
          borderRadius={8}
        />
        <SkeletonBox width={160} height={16} marginBottom={16} />
        <div className="flex">
          <div className="flex-2">
            <SkeletonBox width={150} height={32} marginBottom={8} />
            <SkeletonBox width={160} height={16} />
          </div>
          <div className="flex-1">
            <SkeletonBox width={100} height={32} marginBottom={8} />
            <SkeletonBox width={80} height={16} />
          </div>
        </div>
      </div>
    ));
}
