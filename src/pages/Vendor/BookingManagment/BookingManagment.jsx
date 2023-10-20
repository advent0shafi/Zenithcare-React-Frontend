import React from "react";
import Sidebar from "../../../components/VendorsComponents/Sidebar";
import NavbarVendor from "../../../components/VendorsComponents/NavbarVendor";
import { useParams } from "react-router-dom";
import Datepickers from "../../../components/helpers/Datepickers";
import SlotTable from "../../../components/helpers/SlotTable";

const BookingManagment = () => {
  const { vendorId } = useParams();
  return (
    <div>
      <div className="fixed top-0 w-full z-50 bg-white shadow-md">
        <NavbarVendor />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/5 hidden top-0 mb-8 md:block h-full bg-blue-gray-900">
          <Sidebar />
        </div>

        <div className="w-full  md:w-10/12 p-12 mt-14 bg-white">
          <div className="flex bg-white mb-2">
          
            <div className="bg-white w-[750px] h-34 ml-6  mt-2 p-4 rounded-sm "></div>
          </div>
          <div className="bg-white h-96">
            
         <SlotTable/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingManagment;
