import React from "react";
import images from "./../../assets/doctor.png";


import { Link } from "react-router-dom";
import { CounselorProfile } from "../../pages/UserSide/Counselor/CounselorProfile";

const HCards = ({ name, certification, specializations,language,buttonText, image,id }) => {

  
  return (
    <div className="md:pl-20 md:pr-20 mb-6">
      <div className="md:flex shadow-2xl bg-red-800 overflow-hidden rounded-lg">
        <div className="md:w-1/5 p-4 bg-white">
          <div className="rounded-full mt-4">
            <img className="rounded-full" src={ image?`http://127.0.0.1:8000/media/${image}`:images } alt="Doctor Profile" />
          </div>
        </div>
        <div className="md:w-3/5 bg-white">
          <div className="md:p-16 p-10">
            <h1 className="mb-4 text-2xl text-[#051570] font-semibold">{name}</h1>
            <p className="text-[#195a03c5]">® Certified & Verified</p>
           <p className=""><span className="text-[#bc501b] font-bold ">Specializations :</span> {specializations}</p> 
           <p className=""><span className="text-[#bc501b] font-bold ">Language :</span> {language}</p> 

          </div>
        </div>
        <div className="md:w-1/5 bg-white md:p-4 p-3 md:pl-9 pl-24">
          <div className="md:mt-24 mb-4">
          <button className="bg-transparent hover:bg-[#051570] text-[#051570] text-xl font-bold hover:text-white py-2 px-4 border border-[#051570] hover:border-transparent shadow-lg rounded-[200px] transition duration-300 ease-in-out transform hover:scale-105">
              <CounselorProfile  therapist_id = {id}/>
              </button>
                    
          </div>
        </div>
      </div>
    </div>
  );
};

export default HCards;
