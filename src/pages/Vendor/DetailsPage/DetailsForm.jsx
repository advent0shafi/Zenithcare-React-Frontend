
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/VendorsComponents/Sidebar";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import NavbarVendor from "../../../components/VendorsComponents/NavbarVendor";
import axiosInstance from "../../../axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";



const DetailsForm = () => {
  const { id } = useParams();
const navigate = useNavigate()
  const [userdata, setUserData] = useState({});
  const [catogery, setcatogery] = useState([]);
  const [languages, setlanguage] = useState([]);

  const [formData, setFormData] = useState({
    username: id,
    bio: "",
    certifications:{},
    categories: "",
    languages: "",
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
      updatedValue = e.target.files[0];  // Get the file object
    }
  
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };


  const handleAddressChange = (e) => {
    const { name, value } = e.target;
  
    // Update the address in the form data
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
  
    // Append certifications file to formDataToSend
    formDataToSend.append('certifications', formData.certifications);
  
    for (const key in formData) {
      if (key !== 'certifications') {
        if (key === 'address') {
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
      const response = await axiosInstance.post(
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
        const response = await axiosInstance.get(`vendor/detaitsform/${id}`, {
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

      <div className="flex flex-col md:flex-row md:p-14 ">
        <div className="w-full p-12 mt-14">
          <div className="w-full shadow-lg">
            <div className="p-5 border">
              <div className="space-y-12">
                <form onSubmit={handleSubmit}>
                  {/* Photo */}
           

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
                      {catogery.map((catogery,index) => (
                        <option key={index} value={catogery.id}>
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
                        <option key={index} value={language.id}>
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
                      id="experience_years"
                      name="experience_years"
                      value={formData.experience_years}
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
                      id="hourly_rate"
                      name="hourly_rate"
                      value={formData.hourly_rate}
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
             
                  <div className="mb-4">
  <label htmlFor="certifications" className="block text-sm font-medium text-gray-600">
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