import React from "react";
import AdminCatogery from "./AdminCatogery";
import AdminSidebar from "../../../components/AdminHelpers/AdminSidebar";
import AdminHeader from "../../../components/AdminHelpers/AdminHeader";

function AdminCatogeryLayout() {
  return (
    <div>
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <AdminSidebar />
          <div className="flex flex-col w-full md:space-y-4">
            <AdminHeader />
            <AdminCatogery />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminCatogeryLayout;
