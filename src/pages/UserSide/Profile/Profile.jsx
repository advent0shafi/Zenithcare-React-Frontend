import React, { useState, useEffect } from "react";
import Navbar from "./../../../components/landingPages/Navbar";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PublicAxios from "../../../Axios/PublicAxios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../Interceptor/baseURL";
import ImageLoading from "../../../components/Spinner/ImageLoading";
import PasswordModal from "./PasswordModal";
import Icons from "./../../../assets/SessionIcon.svg";
import Footer from "../../../components/landingPages/Footer";

const Profile = () => {
  const authstate = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // Changed initial value to null
  const user_id = authstate.user_id;
  const [edit, setEdit] = useState(true); // Set to false initially
  const [userdata, setUserdata] = useState({
    username: userData ? userData.username : "",
    phone_number: userData ? userData.phone_number : "",
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
      await PublicAxios.put(`auth/update/${user_id}/`, userdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      notify("User details have been updated.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error updating user", error);
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
      toast.error(
        "An error occurred while updating the image. Please try again."
      );
      console.log("Error: " + error);
    }
  };

  const notify = (message) => toast.success(message);

  return (
    <div>
      <Navbar />
      <div className="md:p-28 p-14">
        <div className="p-8 transition-shadow md:flex md:justify-between  duration-300 bg-white border-4  shadow-[0_3px_10px_rgb(0,0,0,0.2)] sm:items-center hover:shadow text-black rounded-lg mb-4 w-full]">
          <div className="md:ml-16 w-48 md:h-48 bg-indigo-100  rounded-full  text-indigo-500">
            <input
              onChange={handleImageChange}
              type="file"
              id="imageInput"
              style={{ display: "none" }}
            />
            {userData && (
              <div>
                <label
                  htmlFor="imageInput"
                  className="hidden md:flex absolute"
                  style={{ top: "230px", left: "350px", right: "10px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </label>

                {loading && <ImageLoading />}
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : `https://www.zenith-care.online${userData.profile_img}`
                  }
                  className="rounded-full w-48 h-48"
                  alt="profile picture"
                  onError={() => {
                    console.log("Error loading image");
                    console.log("Image URL:", userData.profile_img);
                  }}
                />
              </div>
            )}
          </div>
        {image &&  <button
            onClick={uploadProfileImage}
            className="bg-[#051570] hover:bg-blue-900 text-white text-xs font-bold py-1 px-6 rounded-full"
          >
            Submit Image
          </button>}
          <div className="md:text-start md:text-5xl md:font-extralight md:mx-32">
            <span className="text-[#051570] font-bold">Hellow</span>{" "}
            {userData ? userData.username : ""}
          </div>
        </div>
        <div className="flex items-end justify-end ">
          <div className="p-5">
            <button
              href="#_"
              class="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
            >
              <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
              <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
              <span class="relative text-white">
                <PasswordModal />
              </span>
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div className="text-3xl font-semibold">Personal Information</div>{" "}
        </div>
        {userData && (
          <div className="py-20 px-20">
            <form onSubmit={updateUserDetails}>
              <div className="mb-6">
                <label
                  htmlFor="large-input"
                  className="block mb-2 text-xl font-normal  text-gray-900 dark:text-white"
                >
                  Name{" "}
                </label>
                <input
                  type="text"
                  id="large-input"
                  name="username"
                  placeholder={userData.username}
                  onChange={handleInputChange}
                  className="bg-gray-50 border-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-xl font-normal  text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  placeholder={userData.phone_number}
                  onChange={handleInputChange}
                  id="base-input"
                  className="bg-gray-50 border-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-xl font-normal  text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={userData.email}
                  id="small-input"
                  className="block border-2 w-full p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] text-gray-900  border-gray-300 rounded-lg bg-gray-50 sm:text-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mt-8 flex justify-center items-center">
                <button class="bg-[#051570] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
                  Save The Changes
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="">
          <div className="p-8 transition-shadow  duration-300 bg-white border-4  shadow-[0_3px_10px_rgb(0,0,0,0.2)] sm:items-center hover:shadow text-black rounded-lg mb-4 w-full]">
            <div className="flex justify-center mt-2 mb-2">
              <img className="" src={Icons} />
            </div>
            <div className="flex text-lg font-semibold justify-center mt-8 mb-14">
              View Your Booked Sessions
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-600 text-center font-light lg:px-16">
                <Link to="/booked-sessions">
                  <a
                    href="#_"
                    class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-[#051570] transition duration-300 ease-out border-2 border-[#051570] rounded-full shadow-md group"
                  >
                    <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#051570] group-hover:translate-x-0 ease">
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
                    <span class="absolute flex items-center text-lg font-semibold justify-center w-full h-full text-[#051570] transition-all duration-300 transform group-hover:translate-x-full ease">
                      Booked Sessions
                    </span>
                    <span class="relative invisible">Booked Sessions</span>
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>

        <Toaster />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
