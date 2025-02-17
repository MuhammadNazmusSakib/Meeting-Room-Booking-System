//import React from 'react'

import Sidebar from "../components/Slidebar";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='max-w-screen-2xl mx-auto'>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar/>

        {/* Content Area */}
        <div className="flex-1 bg-gray-100 px-3 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  )
}
