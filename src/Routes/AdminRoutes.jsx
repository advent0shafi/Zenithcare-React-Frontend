import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/Adminside/AdminLogin/AdminLogin";
import AdminAuth from "../Authorisations/AdminAuth";
import BackAuth from "../Authorisations/BackAuth";
import UserList from "../pages/Adminside/AdminUserList/UserList";
import VendorList from "../pages/Adminside/AdminVendorList/VendorList";
import AdminApproveList from "../pages/Adminside/AdminApproveList/AdminApproveList";
import AdminPaymentLayout from "../pages/Adminside/AdminPaymentList/AdminPaymentLayout";
import AdminVendorPaymentLayout from "../pages/Adminside/AdminPaymentList/AdminVendorPaymentLayout";
import AdminHomeLayout from "../pages/Adminside/AdminHome/AdminHomeLayout";
import AdminCatogeryLayout from "../pages/Adminside/AdminCatogery/AdminCatogeryLayout";
import Error from "../components/landingPages/Error";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminAuth />}>
          <Route path="/" element={<AdminHomeLayout />} />
          <Route path="/userlist" element={<UserList/>} />
          <Route path="/vendorlist" element={<VendorList/>} />
          <Route path="/approvelist" element={<AdminApproveList/>} />
          <Route path="/payment-list" element={<AdminPaymentLayout/>} />
          <Route path="/payment-pending" element={<AdminVendorPaymentLayout/>} />
          <Route path="/catogery-language" element={<AdminCatogeryLayout/>} />

        </Route>
        {/* <Route element={<BackAuth />}> */}
          <Route path="/login" element={<AdminLogin />} />
        

        {/* </Route> */}
        <Route path="*" element={<Error/>}/>

      </Routes>
    </>
  );
};

export default AdminRoutes;
