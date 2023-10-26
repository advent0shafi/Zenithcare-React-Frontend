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
import { faBars, faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

export function CounselorProfile({ therapist_id }) {
  const [size, setSize] = React.useState(null);
  const vendor_id = therapist_id;
  const [userdata, setUserData] = useState({});
  const [therapist, setTherapist] = useState({});

  useEffect(() => {
    try {
      PublicAxios.get(`vendor/profile/${vendor_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }).then((response) => {
        JSON.stringify(response);
        console.log(response.data);
        setTherapist(response.data.therapist);
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

  return (
    <>
      <div onClick={() => handleOpen("xl")}>Open Dialog XL</div>
      <Dialog open={size === "xl"} size={size || "md"} handler={handleOpen}>
        <DialogHeader>
          <div className=" w-full flex justify-between">
            <div className="flex justify-between">
              <div className=""> Dr Hello Akash</div>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => handleOpen(null)}
                bounce
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
                        src={`http://127.0.0.1:8000${userdata.profile_img}`}
                        alt="no image"
                      />
                    </div>
                    <div class="w-2/3 bg-white pl-2 text-black">
                      <h1 className="text-2xl font-bold">
                        Dr {userdata && userdata?.username} <span class="inline-block bg-[#32CD32] rounded-full md:px-3 py-1 text-sm font-thin text-white mr-2 mb-2">
                      verified
                    </span>
                      </h1>
                      <p>frr    </p>
                      <p>Flueint in English</p>
                      {/* <p> 8years  of Experience</p> */}
                    </div>
                  </div>
                  <div class="md:px-6  mb-2">
                    <span class="inline-block bg-gray-200 rounded-full md:px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      travel
                    </span>
                    <span class="inline-block bg-gray-200 rounded-full md:px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      travel
                    </span>
                    <span class="inline-block bg-gray-200 rounded-full md:px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      winter
                    </span>
                  </div>
                </div>
                <div className=" p-4">
                  <div className="transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
                    <p className="italic">
                      Column Spacing Add a negative horizontal margin like -mx-2
                      to your column container and an equal horizontal padding
                      like px-2 to each column to add gutters. To prevent
                      horizontal scrolling in full width layouts, add
                      overflow-hidden to another parent container, or compensate
                      for the negative margin with matching horizontal padding.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3  h-72 p-2">
                <div className="pt-6">
                  <div className="">
                  
                    <div className="block bg-[#F8FAFF] border rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div className="p-4 rounded-sm">
                        <div className="p-2">
                          <h5 className="mb-2 text-xl font-medium leading-tight text-black">
                            Book Your Session
                          </h5>
                        </div>
                        <hr></hr>
                        <p className="mb-4 text-base text-neutral-600 text-black">
                          Book Your Session
                        </p>
                        <div className="items-center justify-center pl-16 ">
                          <Link to={`/user-booking/${vendor_id}`}>
                            <button
                              type="button"
                              className="inline-block bg-blue-gray-800 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                              Book Sessions
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* sdfhsdgjg */}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 mt-10">
              <div>
                <h2 className="text-xl font-semibold">
                  Frequently Asked Questions
                </h2>

                <div className="py-4">
                  <p className="text-lg font-semibold">
                    What languages does Ms. Avani Vasani speak?
                  </p>
                  <p>Ms. Avani speaks English, Gujarati, and Hindi.</p>
                </div>

                <div className="py-4">
                  <p className="text-lg font-semibold">
                    What qualifications does Ms. Avani Vasani hold?
                  </p>
                  <p>
                    Ms. Avani holds M.Phil. in Clinical Psychology, M.Sc. in
                    Neuro Psychology, Psychotherapy Counselling, and Abnormal
                    Psychology, as well as English Literature.
                  </p>
                </div>

                <div className="py-4">
                  <p className="text-lg font-semibold">
                    How many years of experience does Ms. Avani Vasani have?
                  </p>
                  <p>Ms. Avani has 8 years of experience.</p>
                </div>

                <div className="py-4">
                  <p className="text-lg font-semibold">
                    Is it possible to consult with Ms. Avani Vasani online?
                  </p>
                  <p>
                    Yes, you can book a video or online consultation with Ms.
                    Avani using DocVita. It's easy, safe & secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
