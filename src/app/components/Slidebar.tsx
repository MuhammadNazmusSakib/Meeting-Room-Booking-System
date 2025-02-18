'use client'

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FaDoorOpen, FaCalendarCheck, FaClipboardList, FaBuilding, FaPlus } from "react-icons/fa";


// Define TypeScript interface for SidebarItem props
interface SidebarItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
}

// Sidebar Item Component
const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label }) => {



  return (
    <Link href={href} className="flex items-center space-x-3 p-3 hover:bg-gray-700 transition">
      <span className="text-xl">{icon}</span>
      <span className="text-lg hidden sm:inline">{label}</span>
    </Link>
  );
};



// Sidebar Component
const Sidebar: React.FC = () => {

  const { user } = useUser()
  const isAdmin = user?.publicMetadata?.role === 'admin'

  return (
    <div className="min-h-screen bg-gray-600 text-white flex flex-col">
      {/* Sidebar Menu */}
      <nav className="lg:ml-4 mt-4 flex flex-col space-y-4">
        <SidebarItem href="/dashboard/meeting-rooms" icon={<FaDoorOpen />} label="Meeting Rooms" />
        <SidebarItem href="/dashboard/my-bookings" icon={<FaCalendarCheck />} label="My Bookings" />
        {
          isAdmin && (
            <>
              <SidebarItem href="/dashboard/all-bookings" icon={<FaClipboardList />} label="All Bookings" />
              <SidebarItem href="/dashboard/all-rooms" icon={<FaBuilding />} label="All Rooms" />
              <SidebarItem href="/dashboard/add-room" icon={<FaPlus />} label="Add Room" />
            </>
          )
        }


      </nav>
    </div>
  );
};

export default Sidebar;



