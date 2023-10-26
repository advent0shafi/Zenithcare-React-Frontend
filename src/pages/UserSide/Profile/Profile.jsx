import React, { useState, useEffect } from "react";
import Navbar from "./../../../components/landingPages/Navbar";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PublicAxios from "../../../Axios/PublicAxios";
import { Link } from "react-router-dom";

const Profile = () => {
  const authstate = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // Changed initial value to null
  const user_id = authstate.user_id;
  const [edit, setEdit] = useState(true); // Set to false initially
  const [userdata, setUserdata] = useState({
    username: userData ? userData.username :"",
    phone_number:userData? userData.phone_number:"",
  });

  useEffect(() => {
    if (authstate.accessToken == null) {
      navigate("/login");
    }
    console.log("user id: " + user_id);

    const fetchUserData = async () => {
      try {
        const response = await PublicAxios.get(`auth/user/${user_id}/`, {
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
  }, [user_id, authstate.accessToken]);

  const handleInputChange = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };
 
  const updateUserDetails = async (event) => {
    event.preventDefault();
    try {
      await PublicAxios.put(`auth/update/${user_id}/`, userdata,{ headers: {
        "Content-Type": "application/json",
      },});
      notify("User details have been updated.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error('Error updating user', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append("profile_img", image);

      await PublicAxios.put(`auth/image/${user_id}/`, formData, {
        withCredentials: true,
      });

      notify("Image has been updated.");
    } catch (error) {
      toast.error("An error occurred while updating the image. Please try again.");
      console.log("Error: " + error);
    }
  };

  const notify = (message) => toast.success(message);

  return (
    <div>
      <Navbar />
      <div className="p-16">
        <div className="p-8 bg-white mt-24 shadow-[rgba(0,0,0,0.24) 0px 3px 8px]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {userData && (
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : `http://127.0.0.1:8000${userData.profile_img}`
                    }
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
                onChange={handleImageChange}
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

              <button
                onClick={uploadProfileImage}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Submit Image
              </button>
            </div>
          </div>
          {edit ? (
            <div className="mt-20 text-center border-b pb-12">
              <h1 className="text-4xl font-medium text-gray-700">
                {userData ? userData.username : ""}
                <span className="font-light text-gray-500"></span>
              </h1>
              <p className="font-light text-gray-600 mt-3">
                {userData ? userData.email : ""}
              </p>
              <p className="font-light text-gray-600 mt-3">
                {userData ? userData.phone_number : ""}
              </p>
            </div>
          ) : (
            <div className="text-center mt-20 border-b pb-12">
              <form onSubmit={updateUserDetails}>
                <div className="w-full">
                  <input
                    type="text"
                    name="username"
                    value={userdata.username}
                    onChange={handleInputChange}
                    className="text-4xl border rounded-md shadow-md font-medium text-gray-700"
                  />
                </div>
                <input
                  type="email"
                  name="email"
               placeholder={userData.email}
                  className="font-light text-gray-600 mt-3 border rounded-md shadow-md"
                />
                <div className="w-full">
                  <input
                    type="number"
                    name="phone_number"
                    value={userdata.phone_number}
                    onChange={handleInputChange}
                    className="font-light text-gray-600 mt-3 border rounded-md shadow-md"
                  />
                </div>
                <button className="bg-red-700 text-white w-auto mt-5 rounded-md p-1 hover:bg-red-900">
                  Update
                </button>
              </form>
            </div>
          )}
          <div className="text-center w-full">
            <h1 onClick={() => setEdit(!edit)} className="text-blue-800 font-normal peer-hover:red-500 ">
              {edit ? "Edit" : "Cancel"}
            </h1>
          </div>
          <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">
              <Link to="/booked-sessions">
                <a
                  href="#_"
                  class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group"
                >
                  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span class="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                    Booked Sessions
                  </span>
                  <span class="relative invisible">Booked Sessions</span>
                </a>
              </Link>
            </p>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Profile;
