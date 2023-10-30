import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/VendorsComponents/Sidebar";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import NavbarVendor from "../../../components/VendorsComponents/NavbarVendor";
import axiosInstance from "../../../axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import PublicAxios from './../../../Axios/PublicAxios'
const DetailsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({});
  const [catogery, setcatogery] = useState([]);
  const [languages, setlanguage] = useState([]);

  const [formData, setFormData] = useState({
    username: id,
    bio: "",
    degree: "",
    university: "",
    certifications: {},
    categories: "",
    languages: [],
    experience_years: "", // Change: Update field name to match backend
    hourly_rate: "",
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

    let updatedValue = value;

    // If it's a file input, get the file
    if (type === "file") {
      updatedValue = e.target.files[0]; // Get the file object
    }

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

  const handleLanguageChange = (selectedLanguages) => {
    const selectedLanguageIds = selectedLanguages.map((lang) => lang.value);
    setFormData({
      ...formData,
      languages: selectedLanguageIds,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append certifications file to formDataToSend
    formDataToSend.append("certifications", formData.certifications);

    for (const key in formData) {
      if (key !== "certifications") {
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
    }

    try {
      const response = await PublicAxios.post(
        "vendor/add-therapist/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Therapist added successfully:", response.data);
      navigate(`/vendor/success`);
    } catch (error) {
      console.error("Error adding therapist:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PublicAxios.get(`vendor/detaitsform/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        console.log(response.data.language);
        console.log(response.data);
        setUserData(response.data);
        setcatogery(response.data.catogery);
        setlanguage(response.data.language);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full z-50 bg-white shadow-md">
        <NavbarVendor />
      </div>

      <div className="flex flex-col md:flex-row md:p-12 ">
        <div className="w-full p-12 mt-14">
          <div className="w-full shadow-lg">
            <div className="p-5 border">
              <div className="">
                <div className="text-center">
                  <h1 className="text-2xl font-medium ">Please fill the following details </h1>
                  <p className="text-sm text-gray-600">
                  Please provide the necessary information to update the therapist's profile. </p>
          
                </div>
               
              </div>
              <div className="space-y-12">
                <form onSubmit={handleSubmit}>
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
                  <div class="md:flex mb-4 gap-3">
                    <div class="md:w-1/2">
                      <div className="">
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
                          {catogery.map((catogery, index) => (
                            <option key={index} value={catogery.id}>
                              {catogery.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div class="md:w-1/2 ">
                      {/* Languages */}
                      <div className="mt-1">
                        <label
                          htmlFor="categories"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Languages
                        </label>
                        <Select
                          isMulti
                          options={languages.map((language) => ({
                            value: language.id,
                            label: language.language,
                          }))}
                          value={formData.languages.map((id) => ({
                            value: id,
                            label: languages.find((lang) => lang.id === id)
                              .language,
                          }))}
                          onChange={handleLanguageChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="md:flex mb-4 gap-3">
                    {/* Experience Years */}
                    <div class="md:w-1/2">
                      <div className="">
                        <label
                          htmlFor="experienceYears"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Experience Years
                        </label>
                        <input
                          type="text"
                          id="experience_years"
                          name="experience_years"
                          value={formData.experience_years}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-md"
                        />
                      </div>
                    </div>
                    <div class="md:w-1/2">
                      {/* Hourly Rate */}
                      <div className="">
                        <label
                          htmlFor="hourlyRate"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Hourly Rate
                        </label>
                        <input
                          type="text"
                          id="hourly_rate"
                          name="hourly_rate"
                          value={formData.hourly_rate}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="md:flex mb-4 gap-3">
                    <div class="md:w-1/2">
                      {/* Degree */}
                      <div className="">
                        <label
                          htmlFor="degree"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Highest Qualifications
                        </label>
                        <input
                          type="text"
                          id="degree"
                          name="degree"
                          value={formData.degree}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-md"
                        />
                      </div>
                    </div>
                    <div class="md:w-1/2">
                      {/* University */}
                      <div className="">
                        <label
                          htmlFor="university"
                          className="block text-sm font-medium text-gray-600"
                        >
                          University
                        </label>
                        <input
                          type="text"
                          id="university"
                          name="university"
                          value={formData.university}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}

                  <div class="md:flex mb-4 gap-3">
                    <div class="w-1/3  ">
                      <div className="">
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
                    </div>
                    <div class="w-1/3  ">
                      <div className="">
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
                    </div>
                    <div class="w-1/3  ">
                      <div className="">
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
                    </div>
                  </div>

                  <div class="md:flex mb-4 gap-3">
                    <div class="md:w-1/2">
                      <div className="">
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
                    </div>
                    <div class="md:w-1/2">
                      <div className="">
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
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="certifications"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Certifications
                    </label>
                    <input
                      type="file"
                      id="certifications"
                      name="certifications"
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      accept=".pdf,.doc,.docx"
                    />
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

export default DetailsForm;
