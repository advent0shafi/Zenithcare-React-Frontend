import React from "react";
import herion from "./../../assets/herion.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div className="w-full md:pl-7 pl-2 bg-white 1B0F8F  ">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[350px]">
        <div className="flex flex-col justify-start gap-4 py-24">
          <p className="py-2 text-2xl text-[#051570] font-medium">
            ZenithCare – Free Your Mind
          </p>
          <h1 className="py-2 md:text-6xl text-5xl font-semibold">
            Best Online Therapy & Counselling Platform.
          </h1>
          <p className="py-2 text-lg text-gray-600">
            Consult Best Psychologist & Counsellor and Mental Health Therapist .
          </p>
          <form className="bg-white border max-w-[650px] py-2 input-box-shadow rounded-md flex justify-between">
            <input
              className="bg-white"
              type="text"
              placeholder="Search therapist here"
            />
            <div className="mr-4 mt-2">
              <FontAwesomeIcon icon={faMagnifyingGlass} beat />
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center md:order-last order-first">
          <img className="" src={herion} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
