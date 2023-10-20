import React from "react";
import images from "./../../assets/doctor.png";


import { Link } from "react-router-dom";

const HCards = ({ name, certification, specializations, buttonText, image,id }) => {

  
  return (
    <div className="md:pl-20 md:pr-20 mb-6">
      <div className="md:flex shadow-2xl bg-red-800 overflow-hidden rounded-lg">
        <div className="md:w-1/5 p-4 bg-white">
          <div className="rounded-full mt-4">
            <img  src={ image?`http://127.0.0.1:8000/media/${image}`:images } alt="Doctor Profile" />
          </div>
        </div>
        <div className="md:w-3/5 bg-white">
          <div className="md:p-16 p-10">
            <h1 className="mb-4 text-2xl text-[#051570] font-semibold">{name}</h1>
            <p className="text-[#FF6600]">® Certified & Verified</p>
            {specializations.map((specialization, index) => (
              <h3 key={index}>{specialization}</h3>
            ))}
          </div>
        </div>
        <div className="md:w-1/5 bg-white md:p-4 p-3 md:pl-9 pl-24">
          <div className="md:mt-24 mb-4">
            <Link to={`/counselor/${id}`}>
              <button className="bg-transparent hover:bg-[#051570] text-[#051570] text-xl font-bold hover:text-white py-2 px-4 border border-[#051570] hover:border-transparent shadow-lg rounded-[200px] transition duration-300 ease-in-out transform hover:scale-105">
                {buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HCards;
