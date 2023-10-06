import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../pages/Adminside/AdminHome/AdminHome";
import AdminLogin from "../pages/Adminside/AdminLogin/AdminLogin";
import AdminAuth from "../Authorisations/AdminAuth";
import BackAuth from "../Authorisations/BackAuth";
import UserList from "../pages/Adminside/AdminUserList/UserList";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminAuth />}>
          <Route path="/" element={<AdminHome />} />
        </Route>
        {/* <Route element={<BackAuth />}> */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/userlist" element={<UserList/>} />
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default AdminRoutes;
