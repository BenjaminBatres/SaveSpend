import React from "react";

export default function Footer() {
  return (
    <div className="max-w-[1440px] w-full mx-auto">
      <div className="pb-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="text-5xl text-[#00bf91]">SaveSpend</div>
          <div className="flex gap-4 text-gray-500">
            <div>Term of Use</div>
            <div>Privacy Policy</div>
          </div>
          <div className="text-gray-500">
            &copy;2025 SaveSpend.All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
