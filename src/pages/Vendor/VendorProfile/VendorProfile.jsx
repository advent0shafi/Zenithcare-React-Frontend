import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/VendorsComponents/Sidebar";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import NavbarVendor from "../../../components/VendorsComponents/NavbarVendor";
import axiosInstance from "../../../axiosInstance";
import { useSelector } from "react-redux";

const VendorProfile = () => {
  const authstate = useSelector((state) => state.auth);
  const [userdata, setUserData] = useState({});
  const [catogery, setcatogery] = useState([]);
  const [languages, setlanguage] = useState([]);
  const user_id = authstate.user_id;

  const [formData, setFormData] = useState({
    username: authstate.username,
    bio: "",
    certifications: null,
    categories: "",
    languages: "",
    experienceYears: "",
    hourlyRate: "",
    address: {
      building: "",
      street: "",
      district: "",
      state: "",
      zipcode: "",
    },
    isCertified: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue = type === "file" ? e.target.files[0] : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "address") {
        for (const addressKey in formData.address) {
          formDataToSend.append(
            `address.${addressKey}`,
            formData.address[addressKey]
          );
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      // Make a POST request to the Django backend
      const response = await axiosInstance.post(
        "vendor/add-therapist/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Therapist added successfully:", response.data);
      // Reset the form or handle success as needed
    } catch (error) {
      console.error("Error adding therapist:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`vendor/profile/${user_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        console.log(response.data.language);
        setUserData(response.data);
        setcatogery(response.data.catogery);
        setlanguage(response.data.language);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [authstate.accessToken, user_id]);

  return (
    <>
      <div className="fixed top-0 w-full z-50 bg-white shadow-md">
        <NavbarVendor />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/5 hidden top-0 mb-8 md:block h-full bg-blue-gray-900">
          <Sidebar />
        </div>

        <div className="w-full md:w-10/12 p-12 mt-14">
          <div className="w-full shadow-lg">
            <div className="p-5 border">
              <div className="space-y-12">
                <form onSubmit={handleSubmit}>
                  {/* Photo */}
                  <div className="col-span-full">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      {userdata.profile_img ? (
                        <div className="rounded-full">
                          <img
                            className="h-12 w-12 rounded-full"
                            src={`http://127.0.0.1:8000${userdata.profile_img}`}
                          />
                        </div>
                      ) : (
                        <UserCircleIcon
                          className="h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )}

                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* Username */}
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder={userdata.username}
                      value={userdata.username}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>

                  {/* Bio */}
                  <div className="mb-4">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>

                  {/* Certifications */}

                  {/* Categories */}
                  <div className="mb-4">
                    <label
                      htmlFor="categories"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Categories
                    </label>
                    <select
                      id="categories"
                      name="categories"
                      value={formData.categories}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    >
                      <option value="">Select a category</option>
                      {catogery.map((catogery) => (
                        <option key={catogery.name} value={catogery.name}>
                          {catogery.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <label
                      htmlFor="languages"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Languages
                    </label>
                    <select
                      id="languages"
                      name="languages"
                      value={formData.languages}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    >
                      <option value="">Select a language</option>
                      {languages.map((language, index) => (
                        <option key={index} value={language.language}>
                          {language.language}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Years */}
                  <div className="mb-4">
                    <label
                      htmlFor="experienceYears"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Experience Years
                    </label>
                    <input
                      type="text"
                      id="experienceYears"
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>

                  {/* Hourly Rate */}
                  <div className="mb-4">
                    <label
                      htmlFor="hourlyRate"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Hourly Rate
                    </label>
                    <input
                      type="text"
                      id="hourlyRate"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <label
                      htmlFor="building"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Building
                    </label>
                    <input
                      type="text"
                      id="building"
                      name="building"
                      value={formData.address.building}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Street
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.address.street}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium text-gray-600"
                    >
                      District
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.address.district}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-600"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.address.state}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="zipcode"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Zipcode
                    </label>
                    <input
                      type="text"
                      id="zipcode"
                      name="zipcode"
                      value={formData.address.zipcode}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Certifications
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className=" mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                          />
                        </svg>

                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="certifications"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="certifications"
                              name="certifications"
                              onChange={handleInputChange}
                              type="file"
                              className="sr-only"
                              accept=".pdf,.doc,.docx"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorProfile;
