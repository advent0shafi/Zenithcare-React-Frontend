import React, { useEffect, useState } from "react";
import Cards from "./../InnerComponents/Cards";
import Slider from "react-slick";
import people from "./../../assets/people.jpg";
import axiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";
import PublicAxios from "../../Axios/PublicAxios";
import { CounselorProfile } from "../../pages/UserSide/Counselor/CounselorProfile";
import Loading from "../Spinner/Loading";


const TopTherapist = () => {
  const [loading,setLoading] = useState(false)
  const [therapistList, setTherapistList] = useState([]);
  useEffect(() => {
    try {
      setLoading(true)
      PublicAxios.get(`vendor/topTherapist`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }).then((response) => {
        JSON.stringify(response);
        setTherapistList(response.data);
        setLoading(false) //  console.log(userdata)
      });
    } catch (error) {
      setLoading(false) //  console.log(userdata)

      console.log("Error fetching user data:", error);
    }
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    
    ],
  };

  return (
  
    <div className="w-full bg-[#E9F8F3B2] pl-7 pr-7 py-32">
          {loading && <div><Loading/></div>}

      <div className="md:max-w-[1326px] m-auto max-w-[350px]">
        <h1 className="text-3xl font-bold">
          Our Top <span className="text-[#051570]">Therapists</span> and{" "}
          <span className="text-[#051570]">Psychiatrist</span>
        </h1>
        <p className="py-3 text-[#536E96]">
          Book an appointment online and see them on a video visit.
        </p>

        <Slider {...settings}>
          {therapistList.map((therapist, index) => (
              <Cards
                key={index}
                image={therapist.therapist_image} 
                name={therapist.therapist_name}
                id = {therapist.user}
                degree={therapist.degree}
                specialization={therapist &&
                  therapist.categories &&
                  therapist.categories.name}
                availabilityDate="Sep 27, 2023 5:00 PM"
              />
                 
          
          ))}
      
        </Slider>
      </div>
    </div>
  
  );
};

export default TopTherapist;
