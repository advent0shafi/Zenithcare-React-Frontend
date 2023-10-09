import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import images from "./../../../assets/doctor.png";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const authstate = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()
  const [image, setImage] = useState("");
  const user_id = authstate.user_id;


  useEffect(() => {
    if (authstate.accessToken == null){
navigate("/login")
    };
    console.log("user id" + user_id);
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`auth/user/${user_id}/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [user_id,authstate.accessToken]); // Include user_id in the dependency array

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profile_img", image);
      await axiosInstance.put(`auth/image/${user_id}/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      notify();
    } catch (error) {
      toast.error("try again")
      console.log("Error: " + error);
    }
  };

  const notify = () => toast.success("Image has been updated.");

  return (
    <div>
        <Navbar/>
         <div className="p-16">
      <div className="p-8 bg-white  mt-24 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
             
              {userData && (
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `http://127.0.0.1:8000${userData.profile_img}`
                } // Access the image URL from the userData object
                className="rounded-full w-48 h-48" 
                alt="profile picture"
                onError={() => {
                  console.log("Error loading image");
                  console.log("Image URL:", userData.profile_img);
                }}
              />
            )}
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
          <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="imageInput"
                style={{ display: "none" }}
              />

              <label
                htmlFor="imageInput"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Change Image
              </label>

              <a
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Submit Image
              </a>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700"> {userData ? userData.username : ""} <span className="font-light text-gray-500"></span></h1>
          <p className="font-light text-gray-600 mt-3">{userData ? userData.email : ""}</p>
          <p className="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
          <p className="mt-2 text-gray-500">University of Computer Science</p>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.
          </p>
          <button className="text-indigo-500 py-2 px-4 font-medium mt-4">Show more</button>
        </div>
      </div>
      <Toaster />
    </div>
          </div>
         

  );
};

export default Profile;
