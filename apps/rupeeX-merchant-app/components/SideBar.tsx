import SidebarItem from "./SideBarItem";
import Logo from "./Logo";

const Sidebar = () => {
  const tabs = [
    { title: "Dashboard", href: "/dashboard", icon: <HomeIcon /> },
    { title: "Transactions", href: "/transactions", icon: <TransferIcon /> },
    { title: "Merchant Profile", href: "/profile", icon: <TransactionsIcon /> },
    { title: "Scheduled Transfers", href: "/scheduledTransfers", icon: <P2PTransferIcon /> },
    { title: "Security", href: "/security", icon:  <HomeIcon /> },
    { title: "Settings", href: "/settings", icon: <TransactionsIcon /> },
    { title: "Help & Support", href: "/support", icon: <P2PTransferIcon /> },
  ];

  return (
    <aside className="bg-gray-800 text-white h-screen w-64 flex flex-col">
      <div className="p-4">
        <Logo />
      </div>
      <nav className="flex-1 mt-4">
        {tabs.map((tab) => (
          <SidebarItem key={tab.title} title={tab.title} href={tab.href} icon={tab.icon} />
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded">
          Logout
        </button>
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

export default Sidebar;