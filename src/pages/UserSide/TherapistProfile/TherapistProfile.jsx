import React, { useEffect,useState } from "react";
import Navbar from "../../../components/landingPages/Navbar";
import images from "./../../../assets/doctor.png";
import image from "./../../../assets/logiko.png";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import FaqCards from "../../../components/helpers/FaqCards";
import { DrawerPlacement } from "../../../components/helpers/Drawers";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PublicAxios from "../../../Axios/PublicAxios";
 

const TherapistProfile = () => {

  const [userdata, setUserData] = useState({});
  const [therapist,setTherapist] = useState({});

  const {id} = useParams();
  useEffect(() => {

    try {
      PublicAxios.get(`vendor/profile/${id}`, {
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
    
             <Link to={`/user-booking/${id}`}> <button className="bg-transparent hover:bg-[#051570]  text-[#051570] text-xl font-bold hover:text-white py-2 px-4 border border-[#051570] hover:border-transparent shadow-lg rounded-[200px] transition duration-300 ease-in-out transform hover:scale-105">
                Book Session
              </button></Link>
           
    </div>
  );
};

export default TherapistProfile;
