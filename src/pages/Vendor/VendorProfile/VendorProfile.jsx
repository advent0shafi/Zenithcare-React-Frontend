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

const initialFormData = {
  username: "",
  phone_number: "",
  // Add other fields as needed
};

const VendorProfile = () => {
  const authstate = useSelector((state) => state.auth);
  const [image, setImage] = useState("");

  const [userdata, setUserData] = useState({});
  const [catogery, setcatogery] = useState([]);
  const [therapist, setTherapist] = useState({});
  const [languages, setlanguage] = useState([]);
  const [formsData, setFormsData] = useState(initialFormData);
  const [toggle, setToggle] = useState(false);
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
        console.log(response.data);
        setTherapist(response.data.therapist);
        setUserData(response.data);
        setlanguage(response.data.therapist.languages);
        setFormsData({
          username: response.data.username,
          phone_number: response.data.phone_number,
          email: response.data.email,

          // Add other fields as needed
        });
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

  const handleInputChange = (e) => {
    setFormsData({
      ...formsData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUserDetails = async (event) => {
    event.preventDefault();
    try {
      await PublicAxios.put(`auth/update/${user_id}/`, formsData, {
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
          <div className="md:flex bg-white mb-2">
            <div class="mb-4">
              <div class="    ">
                <div className=" p-5">
                  <div class="md:flex mb-4 bg-white transition-shadow duration-300 border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg w-full">
                    <div class="w-1/3 bg-white rounded-full overflow-hidden">
                      <img
                        className="rounded-full"
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : `https://www.zenith-care.online${userdata.profile_img}`
                        }
                        alt=""
                      />{" "}
                      <div className=""></div>
                    </div>
                    {!toggle && (
                      <div class="md:px-6 mb-2">
                        <label
                          htmlFor="imageInput"
                          className="inline-block bg-[#051570] hover:bg-[#1e2a6b] rounded-full md:px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer"
                        >
                          Change Image
                        </label>
                        <input
                          onChange={(e) => setImage(e.target.files[0])}
                          type="file"
                          id="imageInput"
                          style={{ display: "none" }}
                        />

                        <span
                          onClick={handleSubmit}
                          class="inline-block bg-gray-200 rounded-full md:px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          Update Image
                        </span>
                      </div>
                    )}
                    {!toggle ? (
                      <div class="w-2/3 bg-white pl-2 text-black mt-5">
                        <h1 className="text-2xl font-bold">
                          {userdata && userdata?.username}{" "}
                          <span class="inline-block bg-[#32CD32] rounded-full md:px-3 py-1 text-sm font-thin text-white mr-2 mb-2">
                            verified
                          </span>
                        </h1>
                        <p>
                          Specialized in{" "}
                          <span>
                            {" "}
                            {therapist &&
                              therapist.categories &&
                              therapist.categories.name}
                          </span>{" "}
                        </p>
                        <p>
                          {" "}
                          <span>
                            {therapist && therapist.experience_years}
                          </span>{" "}
                          years of experience
                        </p>
                        <p>
                          Fluent in{" "}
                          <span>
                            {languages &&
                              languages.map((lang) => lang.language).join(", ")}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <form className="ml-4" onSubmit={updateUserDetails}>
                        <div className="w-full mb-1">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={formsData.username}
                            onChange={handleInputChange}
                            className="w-full text-sm border rounded-md  py-2 px-2 font-medium text-gray-700"
                          />
                        </div>
                        <div className="w-full mb-1">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formsData.email}
                            placeholder={formsData.email}
                            className="w-full text-sm font-light text-gray-600 py-2 px-2 border rounded-md "
                          />
                        </div>
                        <div className="w-full mb-1">
                          <label
                            htmlFor="phone_number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Number
                          </label>
                          <input
                            type="number"
                            id="phone_number"
                            name="phone_number"
                            value={formsData.phone_number}
                            placeholder={formsData.phone_number}
                            onChange={handleInputChange}
                            className="w-full text-sm font-light text-gray-600 py-2 px-2 border rounded-md "
                          />
                        </div>
                        <button className="bg-red-700 text-white w-auto mt-2 rounded-full p-1 hover:bg-red-900 py-1 px-5">
                          Update
                        </button>
                      </form>
                    )}
                  </div>

                  <div className="text-center w-full">
                    <h1
                      onClick={() => setToggle(!toggle)}
                      className="text-blue-800 font-normal peer-hover:red-500 "
                    >
                      {toggle ? "Cancel" : "Edit"}
                    </h1>
                  </div>
                </div>

                <div className=" p-4">
                  <div className="transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
                    <p className="text-lg font-light mb-3">Bio Data </p>
                    <p className="italic text-gray-900 text-base">
                      {therapist && therapist.bio}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" p-4">
                <div className="transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
                  <p className="text-lg font-light">Experince and Fees </p>
                  <div className="p-4">
                    <p className="text-gray-900 text-base">
                      Experience : {therapist.experience_years} years
                    </p>
                    <p className="text-gray-900 text-base">
                      Fees : {therapist.hourly_rate}
                    </p>
                  </div>
                  <p className="italic"></p>
                </div>
              </div>

              <div className=" p-4">
                <div className="transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
                  <p className="text-lg font-light">Educations</p>
                  <div className="p-4">
                    <p className="text-gray-900 text-base">
                      Degree : {therapist.degree}
                    </p>

                    <p className="text-gray-900 text-base">
                      University : {therapist.university} years
                    </p>

                    <a
                      href={therapist && therapist.certifications}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-red-700 text-base hover:underline">
                        {" "}
                        View Certification
                      </span>
                    </a>
                  </div>
                  <p className="italic"></p>
                </div>
              </div>

              <div className=" p-4">
                <div className="transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
                  <p className="text-lg font-light">Address </p>
                  <div className="p-4">
                    <p className="text-gray-900 text-base">
                      {therapist &&
                        therapist.address &&
                        therapist.address.building}
                      ,{" "}
                      {therapist &&
                        therapist.address &&
                        therapist.address.street}
                    </p>

                    <p className="text-gray-900 text-base">
                      {therapist &&
                        therapist.address &&
                        therapist.address.district}
                      ,
                      {therapist &&
                        therapist.address &&
                        therapist.address.state}
                    </p>

                    <p className="text-gray-800 text-base">
                      {" "}
                      Pin Code :
                      {therapist &&
                        therapist.address &&
                        therapist.address.zipcode}
                    </p>
                    <p className="text-gray-900 text-base">
                      {" "}
                      Email :{userdata && userdata.email}
                    </p>
                    <p className="text-gray-900 text-base">
                      {" "}
                      Phone :{userdata && userdata.phone_number}
                    </p>
                  </div>
                  <p className="italic"></p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div>
                  <Link to="/vendor/vendorupdate">
                    <span class="inline-block bg-[#051570] hover:bg-[#3447b1]  rounded-full md:px-5 py-2 text-sm font-semibold text-white mr-2 mb-2">
                      Update Image
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorProfile;
