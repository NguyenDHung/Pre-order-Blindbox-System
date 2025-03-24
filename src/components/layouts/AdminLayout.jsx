import React from "react";
import SidebarAdmin from "../../pages/Admin/SidebarAdmin";
import { Outlet } from "react-router";
function AdminLayout({ children }) {
  return (
    <div className="relative">
      {/* Sidebar Admin - Dịch lên ngang với Navbar */}
      <div className="w-64 h-full bg-white  fixed top-0 left-0">
        <SidebarAdmin />
      </div>

      {/* Nội dung chính (có padding-left để tránh bị đè lên sidebar) */}
      <div className="flex-1 flex flex-col h-full ml-64">
        {children}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
