import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import images from "./../../assets/logiko.png";
import { CounselorProfile } from "../../pages/UserSide/Counselor/CounselorProfile";
import { BASE_URL } from "../../Interceptor/baseURL";

const Cards = (props) => {
  const { image, name, degree, specialization, id, availabilityDate } = props;

  return (
    <div className="bg-white drop-shadow-md h-96 overflow-hidden rounded-2xl mr-3 my-4 md:transition duration-300 ease-in-out transform hover:scale-105">
      <img
        className="h-40 w-full object-cover"
        src={image ? `${BASE_URL}media/${image}` : images}
        alt="People"
      />

      <div className="p-5 border border-b">
        <h1 className="font-bold text-xl">
          {name}{" "}
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#02e840" }} />
        </h1>
        <h1 className="text-sm pb-3">{degree}</h1>
        <h1 className="font-bold text-lg">
          <FontAwesomeIcon
            icon={faSun}
            size="xl"
            style={{ color: "#051570" }}
          />{" "}
          <span className="px-2">Specialization</span>{" "}
        </h1>
        <p className="mt-2">{specialization}</p>
      </div>

      <div className="absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold">
        Verified
      </div>
      <div className="flex justify-center items-center">
        <div>
          <CounselorProfile therapist_id={id} />
        </div>
      </div>
    </div>
  );
};

export default Cards;
