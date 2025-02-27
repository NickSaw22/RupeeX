"use client"

import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({ href, title, icon }: SidebarItemProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const selected = pathName === href;
return (
    <div
  className={`flex items-center px-6 py-3 my-3 mx-2 rounded-xl cursor-pointer 
    transition-all duration-300 ease-in-out 
    ${selected
    ? "bg-gradient-to-r from-[#2196f3] to-[#64b5f6] text-white border-l-4 border-[#2196f3] shadow-xl transform hover:scale-105"
    : "text-gray-800 hover:text-[#2196f3] hover:bg-gray-100 hover:border-l-4 hover:border-transparent"}
    transform hover:shadow-md`}
  onClick={() => router.push(href)}
  aria-label={`Navigate to ${title}`}
>
  <div
    className={`mr-4 text-2xl transition-all duration-300 ${selected ? "text-white" : "text-[#2196f3] group-hover:text-[#2196f3]"}`}
  >
    {icon}
  </div>
  <div className="font-medium text-lg transition-colors duration-300">
    {title}
  </div>
</div>

  );
};
