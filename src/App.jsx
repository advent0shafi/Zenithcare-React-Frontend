import { useState } from "react";

import "./App.css";
import Home from "./pages/UserSide/Home/Home";
import SignIn from "./pages/UserSide/Signin/SignIn";
import UserRoutes from "./Routes/UserRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VendorRoutes from "./Routes/VendorRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/vendor/*"  element={<VendorRoutes/>}/>
        <Route path="/admin/*" element={<AdminRoutes/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
