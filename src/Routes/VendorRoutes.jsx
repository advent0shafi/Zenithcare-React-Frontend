import React from 'react'
import { Routes, Route } from "react-router-dom";
import VendorHome from '../pages/Vendor/VendorHome/VendorHome';
import SignupVendor from '../pages/Vendor/Signup/SignupVendor';
import VendorSignin from '../pages/Vendor/SignIn/VendorSignin';
import VendorProfile from '../pages/Vendor/VendorProfile/VendorProfile';
import VendorAuth from '../Authorisations/VendorAuth';
import VendorOtp from '../pages/Vendor/VendorOtp/VendorOtp';


const VendorRoutes = () => {
  return (
    <div>
        <Routes>
          <Route element={<VendorAuth allows={true}/>}>
            <Route  path="/home" element={<VendorHome/>}/>
            <Route  path="/profile" element={<VendorProfile/>}/>
            </Route>
            <Route path='/signup' element={<SignupVendor/>} />
            <Route path="/login" element={<VendorSignin/>}/>
            <Route path='/otp/:id' element={<VendorOtp/>} />
        </Routes>
    </div>
  )
}

export default VendorRoutes