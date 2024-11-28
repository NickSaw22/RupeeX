import React from "react";
import Sidebar from "../../components/SideBar";

export default function Layout({ children, }: { children: React.ReactNode; }): JSX.Element {
  return (
    <div>
      {/* <div className="flex-1 p-6"> */}
        {children}
      {/* </div>     */}
    </div>
  );
} 
