import React from "react";
import images from "./../../assets/doctor.png";
import { Link} from "react-router-dom";

const HCards = () => {
  return (
    <div className=" md:pl-20 md:pr-20 mb-6">
      <div class="md:flex shadow-2xl bg-red-800 overflow-hidden rounded-lg">
        <div class="md:w-1/5 p-4 bg-white ">
          <div className="rounded-full mt-4">
            <img src={images} />
          </div>
        </div>
        <div class="md:w-3/5 bg-white ">
          <div className="md:p-16 p-10 ">
            <h1 className="mb-4 text-2xl text-[#051570] font-semibold"> Dr. Kavya Shree</h1>
            <p className="text-[#FF6600]"> ® Certified & Verified</p>
            <h3>☑ Top NIMHANS Psychiatrist</h3>
            <h3>☑ Top NIMHANS Psychiatrist</h3>
            <h3>☑ Top NIMHANS Psychiatrist</h3>
          </div>
        </div>
        <div class="md:w-1/5 bg-white md:p-4 p-3 md:pl-9 pl-24">
            <div className="md:mt-24 mb-4">

       <Link to="/counselor"> <button className="bg-transparent hover:bg-[#051570]  text-[#051570] text-xl font-bold hover:text-white py-2 px-4 border border-[#051570] hover:border-transparent shadow-lg rounded-[200px] transition duration-300 ease-in-out transform hover:scale-105">View Profile</button></Link>
            </div>

        </div>
      </div>
    </div>
  );
};

export default HCards;
