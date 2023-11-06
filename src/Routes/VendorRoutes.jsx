import React from 'react'
import { Routes, Route } from "react-router-dom";
import VendorHome from '../pages/Vendor/VendorHome/VendorHome';
import SignupVendor from '../pages/Vendor/Signup/SignupVendor';
import VendorSignin from '../pages/Vendor/SignIn/VendorSignin';
import VendorProfile from '../pages/Vendor/VendorProfile/VendorProfile';
import VendorAuth from '../Authorisations/VendorAuth';
import VendorOtp from '../pages/Vendor/VendorOtp/VendorOtp';
import DetailsForm from '../pages/Vendor/DetailsPage/DetailsForm';
import BookingManagment from '../pages/Vendor/BookingManagment/BookingManagment';
import VendorUpdate from '../pages/Vendor/VendorUpdate/VendorUpdate';
import VendorChat from '../pages/Vendor/VendorChat/VendorChat';
import VendorChatLayout from '../pages/Vendor/VendorChat/VendorChatLayout';
import SuccessPage from '../pages/Vendor/SuccessPage/SuccessPage';
import PaymentLayout from '../pages/Vendor/PaymentsList/PaymentLayout';
import BookedLayoutSessions from '../pages/Vendor/BookedSessions/BookedLayoutSessions';
import VendorWalletLayout from '../pages/Vendor/WalletVendor/VendorWalletLayout';
import VendorBlogLayout from '../pages/Vendor/vendorBlog/VendorBlogLayout';
import Error from '../components/landingPages/Error';

const VendorRoutes = () => {
  return (
    <div>
        <Routes>
          <Route element={<VendorAuth allows={true}/>}>
            <Route  path="/" element={<VendorProfile/>}/>
            <Route  path="/vendorupdate" element={<VendorUpdate/>}/>
            <Route  path="/chat" element={<VendorChatLayout/>}/>
            <Route path="/booking/:vendorId" element={<BookingManagment />} />
            <Route path="/payment" element={<PaymentLayout/>} />
            <Route path='/wallet-vendor' element={<VendorWalletLayout/>}/>
            <Route path='/vendor-blog' element={<VendorBlogLayout/>}/>
             </Route>
            <Route path='/signup' element={<SignupVendor/>} />
            <Route path='/detailform/:id' element={<DetailsForm/>} />
            <Route path="/login" element={<VendorSignin/>}/>
            <Route path="/success" element={<SuccessPage/>}/>
            <Route path='/otp/:id' element={<VendorOtp/>} />
            <Route path='/bookings-sessions' element={<BookedLayoutSessions/>}/>
            <Route path="*" element={<Error/>}/>

        </Routes>
    </div>
  )
}

export default VendorRoutes