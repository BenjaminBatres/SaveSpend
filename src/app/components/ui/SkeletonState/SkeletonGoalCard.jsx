import React from "react";
import SkeletonBox from "./SkeletonBox";

export default function SkeletonGoalCard({ goalCards }) {
  return Array(goalCards)
    .fill(0)
    .map((_, id) => (
      <div className="p-3 rounded-lg border border-gray-300 bg-white" key={id}>
        <SkeletonBox width={120} height={22} marginBottom={16} />
        <SkeletonBox
          width={"100%"}
          height={26}
          marginBottom={12}
          borderRadius={8}
        />
        <SkeletonBox width={110} height={18} marginBottom={16} />
        <div className="border-t border-gray-300 pt-2">
          <div className="flex justify-between items-center">
            <SkeletonBox width={100} height={16} marginBottom={4} />
            <SkeletonBox width={70} height={16} marginBottom={4} />
          </div>
          <div className="flex justify-between items-center">
            <SkeletonBox width={100} height={16} marginBottom={4} />
            <SkeletonBox width={120} height={16} marginBottom={4} />
          </div>
          <div className="flex justify-between items-center">
            <SkeletonBox width={100} height={16} marginBottom={4} />
            <SkeletonBox width={130} height={16} marginBottom={4} />
          </div>
        </div>
      </div>
    ));
}
