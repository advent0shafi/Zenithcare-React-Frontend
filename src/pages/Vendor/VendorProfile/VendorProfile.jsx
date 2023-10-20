import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/VendorsComponents/Sidebar";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import NavbarVendor from "../../../components/VendorsComponents/NavbarVendor";
import axiosInstance from "../../../axiosInstance";
import PublicAxios from "../../../Axios/PublicAxios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import image from "../../../assets/doctor.png";
const VendorProfile = () => {
  const authstate = useSelector((state) => state.auth);
  const [image, setImage] = useState("");

  const [userdata, setUserData] = useState({});
  const [catogery, setcatogery] = useState([]);
  const [therapist, setTherapist] = useState({});
  const [languages, setlanguage] = useState([]);
  const user_id = authstate.user_id;

  useEffect(() => {
    try {
      PublicAxios.get(`vendor/profile/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }).then((response) => {
        JSON.stringify(response);
        setTherapist(response.data.therapist);
        setUserData(response.data);
      });
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
    console.log("its here more here");
  }, [image]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profile_img", image);

      await axiosInstance.put(`auth/image/${user_id}/`, formData, {
        withCredentials: true,
      });

      notify();
    } catch (error) {
      toast.error("Try again");
      console.log("Error: " + error);
    }
  };

  const notify = () => toast.success("Image has been updated.");

  return (
    <>
      <div className="fixed top-0 w-full z-50 bg-white shadow-md">
        <NavbarVendor />
      </div>
      <Toaster />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/5 hidden top-0 mb-8 md:block h-full bg-blue-gray-900">
          <Sidebar />
        </div>

        <div className="w-full  md:w-10/12 p-12 mt-14 bg-white">
          <div className="flex bg-white mb-2">
            <div className="bg-gradient-to-br from-green-500  to-blue-500 rounded-full md:h-48 md:w-48  p-1">
              <img
                className="rounded-full"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `http://127.0.0.1:8000${userdata.profile_img}`
                }
                alt=""
              />
              <div className="">
                {image ? (
                  <div onClick={handleSubmit}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      viewBox="0 0 40 40"
                    >
                      <path
                        fill="#bae0bd"
                        d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"
                      />
                      <path
                        fill="#5e9c76"
                        d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19s19-8.5,19-19S30.5,1,20,1L20,1z"
                      />
                      <path
                        fill="none"
                        stroke="#fff"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                        d="M11.2,20.1l5.8,5.8l13.2-13.2"
                      />
                    </svg>
                  </div>
                ) : (
                  <label
                    htmlFor="imageInput"
                    className=" w-10 h-10 rounded-full "
                  >
                    <svg
                      htmlFor="imageInput"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="h-8 w-8  right-0  m-2"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      // onClick={handleCameraIconClick}
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                      />
                    </svg>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      id="imageInput"
                      style={{ display: "none" }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="bg-white w-[750px] h-34 ml-6  mt-2 p-4 rounded-sm ">
              <h1 className="text-2xl">DR: {userdata && userdata.username}</h1>
              <h1 className="text-1xl">email: {userdata && userdata.email}</h1>
              <h1 className="text-1xl">
                Specialisations : {therapist && therapist.categories?.name}
              </h1>
              <h1 className="text-1xl">
                Langauge: {therapist && therapist.languages?.language}
              </h1>
            </div>
          </div>
          <div className="bg-white h-96">
            <div className="bg-white h-56 p-6">
              <h1 className="text-2xl pl-8 "> DEATILES</h1>

              <p className=" pl-8 ">{therapist && therapist.bio}</p>
            </div>
          </div>
          <Link to="/vendor/vendorupdate">
          <a
            href="#_"
            class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
          >
            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
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
            <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              Update Profile
            </span>
            <span class="relative invisible">Update Profile</span>
          </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default VendorProfile;
