import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/UserSide/Home/Home";
import SignIn from "../pages/UserSide/Signin/SignIn";
import SignUp from "../pages/UserSide/Signup/SignUp";
import Counselor from "../pages/UserSide/Counselor/Counselor";
import UserOtp from "../pages/UserSide/UserOtp/UserOtp";
import Profile from "../pages/UserSide/Profile/Profile";
import TherapistProfile from "../pages/UserSide/TherapistProfile/TherapistProfile";
import ReqAuth from "../Authorisations/ReqAuth";
import BackAuth from "../Authorisations/BackAuth";

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<BackAuth />}>
          <Route exact path="/login" element={<SignIn />} />
        </Route>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/otpuser/:id" element={<UserOtp />} />
        <Route element={<ReqAuth />}>
          <Route exact path="/Therapist" element={<Counselor />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/counselor" element={<TherapistProfile />} />
        </Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
