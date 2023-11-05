import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import image from "./../../../assets/girls2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PublicAxios from "../../../Axios/PublicAxios";
import {
  faBars,
  faXmark,
  faHandHoldingDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";



export function CounselorProfile({ therapist_id }) {
  const [size, setSize] = React.useState(null);
  const vendor_id = therapist_id;
  const [userdata, setUserData] = useState({});
  const [therapist, setTherapist] = useState({});
  const [language, setLanguage] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;
  const [report, setReport] = useState({
    therapist: therapist_id, // You may need to fetch the therapist user ID dynamically
    reported_by:user_id,
    reason: "",
    description: "",
  });

  useEffect(() => {
    try {
      PublicAxios.get(`vendor/profile/${vendor_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }).then((response) => {
        JSON.stringify(response);
        // console.log(response.data);
        setTherapist(response.data.therapist);
        setLanguage(response.data.therapist.languages);
        console.log(response.data);
        setUserData(response.data);
      });
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }, []);
  const handleOpen = (value) => {
    console.log(vendor_id);
    setSize(value);
  };

  // const handleReport = () => {
  //   setIsReportModalOpen(false);
  //   setReportContent("");
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    PublicAxios.post('adminside/reports-create/', report)
      .then(response => {
        // Handle success
        console.log('Report submitted:', response.data);
        toast.success('reported this therapist');
        setIsReportModalOpen(false);
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting report:', error);
        toast.success('reporting failed');
        setIsReportModalOpen(false);
      });
 
  };

  return (
    <>
      <div onClick={() => handleOpen("xl")}>View Details</div>
      <Dialog open={size === "xl"} size={size || "md"} handler={handleOpen}>
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
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => handleOpen(null)}
              />
            </div>
          </div>
        </DialogHeader>
        <div className="border w-full"></div>
        <DialogBody className="h-96 overflow-y-scroll">
          <div>
            <div class="md:flex mb-4">
              <div class="md:w-2/3     ">
                <div className=" p-8">
                  <div class="flex mb-4 bg-white">
                    <div class="w-1/3 bg-white rounded-full overflow-hidden">
                      <img
                        className="rounded-full "
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
                          {language &&
                            language.map((lang) => lang.language).join(", ")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="md:px-6  mb-2">
                    <span class="inline-block bg-gray-200 rounded-full md:px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      Zenithcare
                    </span>
                    <span class="inline-block bg-gray-200 rounded-full md:px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      Mental health
                    </span>
                  </div>
                </div>
                <div className=" p-4">
                  <div className="transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
                    <p className="italic">{therapist && therapist.bio}</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3  h-72 p-2">
                <div className="pt-6">
                  <div className="">
                    <div className="block bg-[#ffffff] border rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div className="p-4 rounded-sm">
                        <div className="p-2">
                          <h5 className="mb-2 text-xl font-medium leading-tight text-black">
                            Book Your Session
                          </h5>
                        </div>

                        <div className="items-center justify-center pl-16 ">
                          <Link to={`/user-booking?vendor_id=${vendor_id}`}>
                            <button
                              type="button"
                              className="inline-block bg-[#051570]  rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                              Book Sessions
                            </button>
                          </Link>
                        </div>
                        <div className="">
                          <div className="mt-2  space-y-3">
                            <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto"></p>
                          </div>

                          <div className="">
                            <hr className="mt-2"></hr>
                          </div>
                          <div className="text-start font-medium text-lg mt-2">
                            Booking Hourly Rate
                          </div>
                          <div className="flex justify-between mt-2 ">
                            <div className="text-gray-600 font-medium">
                              Session Fee
                            </div>
                            <div className="font-light text-">
                              ₹ {therapist && therapist.hourly_rate}
                            </div>
                          </div>
                          <div className="">
                            <hr className="mt-2"></hr>
                          </div>
                          <div className="mt-2  space-y-3">
                            <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
                              Read our Policy for Reschedule & Cancellation{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 mt-10">
              <div className="col1 w-100">
                <h2 className="text-xl font-medium text-black">
                  About {userdata && userdata?.username}
                </h2>

                <div className="flex items-center mb-2">
                  <span
                    className="practice-info_icon me-2"
                    style={{ height: "18px", width: "auto" }}
                  ></span>
                  <span className="mt-2 ml-8 font-normal text-gray-600">
                    I work with Individuals, Couples & Families
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-black text-left">
                    Education
                  </h2>
                  <div className="mt-2 ml-8">
                    <p className="text-gray-600">
                      {" "}
                      {therapist && therapist.degree}
                    </p>
                    <p className="text-gray-600">
                      from {therapist && therapist.university}.
                    </p>
                  </div>

                  <h2 className="text-lg font-medium text-black text-left">
                    Locations
                  </h2>
                  <div className="mt-2 ml-8">
                    <p className="text-gray-600">
                      {" "}
                      {therapist &&
                        therapist.address &&
                        therapist.address.building}
                      ,
                      {therapist &&
                        therapist.address &&
                        therapist.address.street}
                    </p>
                    <p className="text-gray-600">
                      {therapist &&
                        therapist.address &&
                        therapist.address.district}
                      ,
                      {therapist &&
                        therapist.address &&
                        therapist.address.state}
                    </p>
                    <p className="text-gray-600">
                      Pin Code :
                      {therapist &&
                        therapist.address &&
                        therapist.address.zipcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 mt-10">
              <div>
                <h2 className="text-lg font-semibold text-indigo-700">
                  Frequently Asked Questions
                </h2>

                <div className="py-4">
                  <p className="text-base font-semibold text-gray-800">
                    What languages does {userdata && userdata?.username} speak?
                  </p>
                  <p className="text-base text-gray-600">
                    {userdata && userdata?.username} speaks{" "}
                    {language &&
                      language.map((lang) => lang.language).join(", ")}
                    .
                  </p>
                </div>

                <div className="py-4">
                  <p className="text-base font-semibold text-gray-800">
                    What qualifications does {userdata && userdata?.username}{" "}
                    hold?
                  </p>
                  <p className="text-base text-gray-600">
                    They hold a {therapist && therapist.degree} from{" "}
                    {therapist && therapist.university}.
                  </p>
                </div>

                <div className="py-4">
                  <p className="text-base font-semibold text-gray-800">
                    How many years of experience does{" "}
                    {userdata && userdata?.username} have?
                  </p>
                  <p className="text-base text-gray-600">
                    {userdata && userdata?.username} has{" "}
                    {therapist && therapist.experience_years} years of
                    experience.
                  </p>
                </div>

                <div className="py-4">
                  <p className="text-base font-semibold text-gray-800">
                    Is it possible to consult with{" "}
                    {userdata && userdata?.username} online?
                  </p>
                  <p className="text-base text-gray-600">
                    Yes, you can book a video or online consultation with{" "}
                    {userdata && userdata?.username} using Zenithcare. It's
                    easy, safe & secure.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="text-red-600 hover:underline hover:text-red-800 cursor-pointer"
              >
                Report
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
      <Dialog
        open={isReportModalOpen}
        size="md"
        handler={() => setIsReportModalOpen(false)}
      >
        <DialogHeader>    <h2 className="text-2xl font-bold mb-4">Therapist Report</h2></DialogHeader>
        <DialogBody>
          <div className="p-4">
        
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reason:
                </label>
                <input
                  type="text"
                  id="reason"
                  name="reason"
                  value={report.reason}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={report.description}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Submit Report
              </button>
            </form>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
