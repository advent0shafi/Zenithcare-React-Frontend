import React, { useEffect,useState } from "react";
import Navbar from "../../../components/landingPages/Navbar";
import images from "./../../../assets/doctor.png";
import image from "./../../../assets/logiko.png";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import FaqCards from "../../../components/helpers/FaqCards";
import { DrawerPlacement } from "../../../components/helpers/Drawers";


const TherapistProfile = () => {

  const [userdata, setUserData] = useState({});
  const [therapist,setTherapist] = useState({});

  const {id} = useParams();
  useEffect(() => {

    try {
      axiosInstance.get(`vendor/profile/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }).then((response)=>{
        JSON.stringify(response)
        console.log(response.data)
        setTherapist(response.data.therapist)
        setUserData(response.data);
       
      });
     
    } catch (error) {
      console.log("Error fetching user data:", error);
    }

}, []);



  return (
    <div>
      <Navbar />
      <div class="md:flex mb-4">
        <div class="md:w-1/4 w-full h-screen ">
          <div className="bg-white mt-4 ml-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
            <div className=" rounded-full">
              <div className="rounded-full ">
                <img className="rounded-full  mt-4" src={ `http://127.0.0.1:8000${userdata.profile_img}`} />
              </div>
            </div>
            <div className="md:p-16 p-10 ">
              <h1 className="mb-4 text-2xl text-[#051570] font-semibold">
                {" "}
                Dr. {userdata && userdata.username}
              </h1>
              <p className="text-[#FF6600]"> ® Certified & Verified</p>
              <h3>☑ Top NIMHANS Psychiatrist</h3>
              <h3>☑ Top NIMHANS Psychiatrist</h3>
              <h3>☑ Top NIMHANS {id}</h3>
            </div>
            <div className="flex justify-center p-4 items-center">
         {/* <FaqCards  userId={id}/> */}
             <Link to={`/user-booking/${id}`}> <button className="bg-transparent hover:bg-[#051570]  text-[#051570] text-xl font-bold hover:text-white py-2 px-4 border border-[#051570] hover:border-transparent shadow-lg rounded-[200px] transition duration-300 ease-in-out transform hover:scale-105">
                Book Session
              </button></Link>
            </div>
          </div>
        </div>
        <div class="md:w-3/4 w-full p-4">
          <div className=" bg-white p-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className="flex justify-center items-center">
              <img className="w-[80px] pl-1" src={image} alt="" />
            </div>
            <p className="mt-4 font-semibold">
             {therapist && therapist.bio}
            </p>
            <p className="mt-4 font-semibold">
             {therapist && therapist.bio}
            </p>

           

           
          </div>
        {/* <div className="bg-gray-500 h-16 mt-4">
            <div className="bg-green-900 h-52"></div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
