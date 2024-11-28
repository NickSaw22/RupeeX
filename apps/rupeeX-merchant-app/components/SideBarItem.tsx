"use client"

import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: JSX.Element;
}

const SidebarItem = ({ href, title, icon }: SidebarItemProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const selected = pathName === href;
return (
    <div
  className={`group flex items-center px-6 py-3 my-3 mx-2 rounded-xl cursor-pointer 
    transition-all duration-300 ease-in-out 
    ${selected
    ? "bg-gradient-to-r from-[#2196f3] to-[#64b5f6] text-white border-l-4 border-[#2196f3] shadow-xl transform hover:scale-105"
    : "text-white hover:text-[#2196f3] hover:bg-gray-100 hover:border-l-4 hover:border-transparent"}
    transform hover:shadow-md`}
  onClick={() => router.push(href)}
  aria-label={`Navigate to ${title}`}
>
  <div
    className={`mr-4 text-2xl transition-all duration-300 ${selected ? "text-white" : "text-[#2196f3] group-hover:text-[#2196f3]"}`}
  >
    {icon}
  </div>
  <div className={`font-medium text-lg transition-all duration-300 ${selected ? "text-white" : "text-white group-hover:text-[#2196f3]"}`}>    {title}
  </div>
</div>

  );
};

export default SidebarItem;
