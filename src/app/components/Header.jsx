import React from "react";

export default function Header({ title }) {
  return (
    <header className="ml-[70px] lg:h-[65px] lg:border-b border-b-gray-200  flex items-center px-6">
      <div className="text-2xl font-semibold">{title}</div>
    </header>
  );
}
