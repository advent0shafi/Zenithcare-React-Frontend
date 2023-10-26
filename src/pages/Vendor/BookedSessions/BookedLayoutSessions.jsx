import React from "react";
import Sidebar from "../../../components/VendorsComponents/Sidebar";
import NavbarVendor from "../../../components/VendorsComponents/NavbarVendor";
import { useParams } from "react-router-dom";
import image from "./../../../assets/logiko.png";
import BookedSessions from "./BookedSessions";


const BookedLayoutSessions = () => {
 
  return (
    <div>
      <div className="fixed top-0 w-full z-50 bg-white shadow-md">
        <NavbarVendor />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/5 hidden top-0 mb-8 md:block h-full bg-blue-gray-900">
          <Sidebar />
        </div>

        <div className="w-full  md:w-10/12 p-4 mt-24">
 <BookedSessions/>
        </div>
      </div>
    </div>
  );
};

export default BookedLayoutSessions;
