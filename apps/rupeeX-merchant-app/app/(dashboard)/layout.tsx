import React from "react";
import Sidebar from "../../components/SideBar";

export default function Layout({ children, }: { children: React.ReactNode; }): JSX.Element {
  return (
    <div className="flex">
      <div className="w-72 border-slate-300 min-h-screen mr-4">
        <Sidebar />
      </div>
      {children}
    </div>
  );
} 
