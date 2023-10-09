import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../pages/Adminside/AdminHome/AdminHome";
import AdminLogin from "../pages/Adminside/AdminLogin/AdminLogin";
import AdminAuth from "../Authorisations/AdminAuth";
import BackAuth from "../Authorisations/BackAuth";
import UserList from "../pages/Adminside/AdminUserList/UserList";
import VendorList from "../pages/Adminside/AdminVendorList/VendorList";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminAuth />}>
          <Route path="/" element={<AdminHome />} />
          <Route path="/userlist" element={<UserList/>} />
          <Route path="/vendorlist" element={<VendorList/>} />
        </Route>
        {/* <Route element={<BackAuth />}> */}
          <Route path="/login" element={<AdminLogin />} />
        

        {/* </Route> */}
      </Routes>
    </>
  );
};

export default AdminRoutes;
