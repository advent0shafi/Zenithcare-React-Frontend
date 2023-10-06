import React from "react";
import AdminSidebar from "../../../components/AdminHelpers/AdminSidebar";
import AdminHeader from "../../../components/AdminHelpers/AdminHeader";
import AdminBody from "../../../components/AdminHelpers/AdminBody";

const AdminHome = () => {
  return (
    <div>
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <AdminSidebar/>
          <div className="flex flex-col w-full md:space-y-4">
            <AdminHeader/>
            <AdminBody/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
