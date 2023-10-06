import React from "react";
import AdminFirstBody from "./AdminFirstBody";
import AdminCards from "./AdminCards";
import AdminCalenders from "./AdminCalenders";

const AdminBody = () => {
  return (
    <>
      <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
          Good afternoom, Charlie
        </h1>
        <h2 className="text-gray-400 text-md">
          Here&#x27;s what&#x27;s happening with your ambassador account today.
        </h2>
        <AdminFirstBody />
        <AdminCalenders />
        <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-3">
          <AdminCards />
          <AdminCards />
          <AdminCards />
          <AdminCards />
          <AdminCards />
        </div>
      </div>
    </>
  );
};

export default AdminBody;
