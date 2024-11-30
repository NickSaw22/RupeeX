"use client";

import SidebarItem from "./SideBarItem";
import Logo from "./Logo";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className } : SidebarProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/auth/signIn" && pathname !== "/auth/signUp") {
      router.push("/auth/signIn");
    }
  }, [status, pathname, router]);


  const tabs = [
    { title: "Dashboard", href: "/merch-dashboard", icon: <HomeIcon /> },
    { title: "Bank Transfer", href: "/bankTransfers", icon: <TransferIcon /> },
    { title: "Merchant Profile", href: "/merch-profile", icon: <ProfileIcon /> },
    { title: "Scheduled Transfers", href: "/scheduledTransfers", icon: <ScheduledTransactionsIcon /> },
    { title: "Transers", href: "/merch-transactions", icon: <TransactionsIcon /> },
    // { title: "Settings", href: "/settings", icon: <TransactionsIcon /> },
    // { title: "Help & Support", href: "/support", icon: <P2PTransferIcon /> },
  ];

  return (
    <aside className={ className ? className :"fixed bg-gray-800  top-0 left-0  text-white h-screen w-64 flex flex-col justify-between"}>
      <div>
        <div className="p-4">
          <Logo />
        </div>
        {session?.user && (
          <nav className="flex-1 mt-4">
            {tabs.map((tab) => (
              <SidebarItem key={tab.title} title={tab.title} href={tab.href} icon={tab.icon} />
            ))}
          </nav>
        )}
      </div>
      <div className="p-4 border-t border-gray-700">
        {session?.user ? (
          <>
            <span className="hidden sm:inline">
              Welcome, {session.user.name || "User"}
            </span>
            <button onClick={() => signOut()} className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded">
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Login
          </button>
        )}
      </div>
    </aside>
  );
};


 // Icons Fetched from https://heroicons.com/
 function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}

function ProfileIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
}

function P2PTransferIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>

}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}

function ScheduledTransactionsIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
  </svg>
}

export default Sidebar;
