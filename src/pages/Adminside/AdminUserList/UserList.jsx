import React from "react";
import AdminSidebar from "../../../components/AdminHelpers/AdminSidebar";
import AdminHeader from "../../../components/AdminHelpers/AdminHeader";
import UserTable from "../../../components/AdminHelpers/AdminUserList/UserTable";
const UserList = () => {
  const urlEndpoint = "userlist";
  const button_endpoint = "block";

  return (
    <div>
      <main className="">
        <div className="flex items-start justify-between">
          <AdminSidebar />
          <div className="flex flex-col w-full md:space-y-4">
            <AdminHeader />
            <div className="p-8">
              <UserTable
                urlEndpoint={urlEndpoint}
                Button_Endpoint={button_endpoint}
                IsTherapist = {true}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserList;
