import React from "react"
import herion from "./../../assets/girlss.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Booster = () => {
  return (
    <div className="w-full md:pl-7 pl-2 bg-white  ">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[350px]">
        <div className="flex flex-col justify-start  py-24">
          <h1 className="py-2 text-3xl text-[#051570] font-bold">
            A Dedicated Team You Can Count On
          </h1>
          <p className="py-2 text-gray-600">
            Online counselling is the fastest way in which people who need
            online counseling can reach out at their convenience. Free Your Mind
            from negativity and feel free to consult the best expert.
          </p>
          <p className="py-2 text-gray-600">
            Consult Top & Best Psychologist, Counsellor, Mental Health
            Therapist, Psychotherapist now. Experience the best therapy &
            Counselling session online. Chat/Phone Call/ Video Call for your
            emotional & mental health issues.
          </p>
          <p className="py-2 text-gray-600">
            With Online therapy, people can greatly succeed from issues such as
            sadness, worrying, stress, depression, phobias, marital problems,
            self-esteem problems and many more issues. Also, therapy can be
            extremely beneficial for individuals and families.
          </p>
          <div className="max-w-[650px] py-5 flex ">
            
         <button className="bg-[#051570] text-white h-[40px] w-[350px] shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] rounded-[200px] transition duration-300 ease-in-out transform hover:scale-105">Book Your Therapy Session</button>
          </div>
        </div>
        <div className="flex items-center justify-center md:order-last order-first">
          <img className="" src={herion} />
        </div>
      </div>
    </div>
  );
};

export default Booster;
