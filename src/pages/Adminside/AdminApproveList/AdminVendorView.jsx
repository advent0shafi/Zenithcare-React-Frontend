import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip,
} from "@material-tailwind/react";
import PublicAxios from "../../../Axios/PublicAxios";
import PrivateAxios from "../../../Interceptor/AxiosInterceptor";
import { BASE_URL } from "../../../Interceptor/baseURL";

const AdminVendorView = ({ user_id }) => {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = React.useState(null);
  const [therapist, setTherapist] = useState("");
  const [userdata, setUserdata] = useState("");
  const [language, setLanguage] = useState({});
  const handleOpen = (value) => setSize(value);

  useEffect(() => {
    console.log("user_id:", user_id);

    const fetchData = async () => {
      try {
        const response = await PrivateAxios.get(`vendor/profile/${user_id}`);
        console.log("data", response.data.therapist);
        setTherapist(response.data.therapist);
        setUserdata(response.data);
        setLanguage(response.data.therapist.languages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex gap-3">
        <Chip
          onClick={() => handleOpen("lg")}
          variant="ghost"
          color="green"
          size="sm"
          value="View Details"
        />
      </div>{" "}
      <Dialog open={size === "lg"} size={size || "lg"} handler={handleOpen}>
        <DialogHeader>
          <div className=" w-full flex justify-between">
            <div className="flex justify-between">
              <div className=" ">
                {" "}
                <div className="text-base font-extralight">
                  {userdata && userdata?.username}
                </div>{" "}
                <div className="text-sm font-thin">
                  <span className="text-red-900 font-semibold">
                    Specilizations
                  </span>{" "}
                  {therapist &&
                    therapist.categories &&
                    therapist.categories.name}
                </div>
              </div>
            </div>
            <div>
              <svg
                onClick={() => handleOpen(null)}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </DialogHeader>
        <DialogBody className="h-96 overflow-y-scroll">
          <div className="md:flex mb-4">
            <div className="">
              <div className=" p-5">
                <div class="flex mb-4 bg-white transition-shadow duration-300  border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg w-full">
                  <div class="h-52 w-52 bg-white rounded-full overflow-hidden relative">
                    <img
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      src={`https://www.zenith-care.online${userdata.profile_img}`}
                      alt="no image"
                    />
                  </div>
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
                        {/* {language &&
                          language.map((lang) => lang.language).join(", ")} */}
                      </span>
                    </p>
                  </div>
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
                        therapist.address.building}, {therapist &&
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

                    <p className="text-gray-800 text-base">                    Pin Code :
                      {therapist &&
                        therapist.address &&
                        therapist.address.zipcode}
                        </p>
                        <p className="text-gray-900 text-base">                    Email :
                      {userdata &&
                        userdata.email }
                        </p>
                        <p className="text-gray-900 text-base">                    Phone :
                      {userdata &&
                        userdata.phone_number }
                        </p>
                        
                  </div>
                  <p className="italic"></p>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default AdminVendorView;
