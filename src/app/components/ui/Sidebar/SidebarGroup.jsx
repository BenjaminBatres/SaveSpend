import React from "react";
import SidebarIcon from "../Sidebar/SidebarIcon";
export default function SidebarGroup({ icons, labels, links }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {icons.map((Icon, iIndex) => (
        <SidebarIcon
          key={iIndex}
          Icon={Icon}
          label={labels[iIndex]}
          link={links[iIndex]}
        />
      ))}
      <div className="border-b-2 w-6 border-gray-700 my-4"></div>
    </div>
  );
}
