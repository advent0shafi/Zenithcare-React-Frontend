import React, { useState, useEffect } from "react";
import BookingCards from "./BookingCards";
import BookingCards2 from "./BookingCards2";
import BookingCards3 from "./BookingCards3";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PublicAxios from "../../../Axios/PublicAxios";
import { BASE_URL } from "../../../Interceptor/baseURL";
import QueryString from "query-string";
import { SiGooglemeet } from "react-icons/si";
import { FaHome } from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import BookingCards4 from "./BookingCards4";

const UserBooking = ({ payamount }) => {
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;
  const username = authstate.username;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('vendor_id');  
  const [sessions, setSessions] = useState("");
  const [dates, setDates] = useState("");
  const [time, setTime] = useState("");
  const [dataId, setDataId] = useState("");
  const [infoUserData, setInfoUserData] = useState([]);
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(false);
  const [showCard3, setShowCard3] = useState(false);
  const [showCard4, setShowCard4] = useState(false);
  const [CardsContent, setCardsContent] = useState("");
  const handlesession = (e) => {
    console.log(e);
    handleContent(
      "Select mode & type of session to continue booking. You will still have a chance to review and edit these before final confirmation."
    );
    setSessions(e);
  };

  const handleContent = (e) => {
    setCardsContent(e);
  };

  const handleDates = (e) => {
    handleContent(
      "Now you have select date and now select the time approiate for you"
    );
    setDates(e);
  };
  const handleTime = (e) => {
    console.log(e);
    setTime(e);
  };

  const handleDateId = (e) => {
    setDataId(e);
  };

  const handleCard1Select = () => {
    setShowCard2(true);
    setShowCard1(false);
  };

  const handleCard2Select = () => {
    handleContent(
      "Please fill the follwing so therapist can know about you little"
    );
    setShowCard2(false);
    setShowCard4(true);
  };
  const handleUserInfoCards = {
    if (infoUserData) {
      setShowCard4(false);
      setShowCard3(true);
    }
  }
    const handleUserInfo = (data) => {
    setInfoUserData(data);
    console.log("userdata:-", data);
    setShowCard4(false);

    setShowCard3(true);
  };
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <div class="md:flex mb-4">
      <div class="md:w-3/4 w-full p-4">
        <div className="flex flex-col items-center p-4 ">
          <div className="  transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
            <div className="justify-end items-end md:pl-96">
              {!showCard1 && (
                <p
                  className="text-green-800 md:pl-96"
                  onClick={() => 
                   { setShowCard2(false)
                    setShowCard1(true)
                    setShowCard3(false)
                    setShowCard4(false)}}
                >
                  Change
                </p>
              )}
            </div>
            {showCard1 ? (
              <h5 className="text-xl font-semibold">
                1.Select Mode Of Sessions{" "}
              </h5>
            ) : (
              <h5 className="text-xl font-semibold">
                1.Mode{" "}
                {sessions && (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ color: "#008000" }}
                  />
                )}
              </h5>
            )}
            {!showCard1 && (
              <p className="mt-4">
                {sessions && (
                  <span className="text-gray-500 ">Here your selected </span>
                )}
                <span className="text-red-900 font-bold">{sessions}</span>
              </p>
            )}
            {showCard1 && (
              <BookingCards
                onSelect={handleCard1Select}
                selectedItems={handlesession}
              />
            )}
          </div>

          <div className=" transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
            {showCard2 ? (
              <h1 className="text-xl font-semibold">2.Select Date And Time</h1>
            ) : (
              <h4 className="text-xl font-semibold">
                2.Date And Time{" "}
                {time && (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ color: "#008000" }}
                  />
                )}
              </h4>
            )}
            <div className="justify-end items-end md:pl-96">
              {!showCard2 && (
                <p
                  className="text-green-800  md:pl-96"
                  onClick={() => {
                    setShowCard2(true)
                    setShowCard1(false)
                    setShowCard3(false)
                    setShowCard4(false)
                  }}
                >
                  {time && "Change"}
                </p>
              )}
            </div>
            {showCard2 && (
              <BookingCards2
                onSelect={handleCard2Select}
                selectedItems={handleDates}
                setectedTimes={handleTime}
                id={id}
                setDateId={handleDateId}
              />
            )}
            {!showCard2 && (
              <p className="mt-4">
                {time && (
                  <div>
                    <span className="text-gray-500">
                      Here is your Date and Time:
                    </span>
                    <span className="text-red-900 font-bold">{dates}</span>--
                    <span className="text-red-900 font-bold">{time}</span>
                  </div>
                )}
              </p>
            )}
          </div>
          <div className="transition-shadow duration-300 bg-white border  shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
            {showCard4 ? (
              <h1 className="text-xl font-semibold">3.Fill Your Info</h1>
            ) : (
              <h4 className="text-xl font-semibold">
                3.User Info
                {infoUserData.length != 0 && (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ color: "#008000" }}
                  />
                )}
              </h4>
            )}{" "}
            <div className="justify-end items-end md:pl-96">
              {!showCard4 && (
                <p
                  className="text-green-800  md:pl-96"
                  onClick={() =>{
                      setShowCard2(false)
                      setShowCard1(false)
                      setShowCard3(false)
                      setShowCard4(true)
                    }}
                >
                  {infoUserData.length != 0 && "Change"}
                </p>
              )}
            </div>
            {showCard4 && (
              <BookingCards4
                handleUserInfo={handleUserInfo}
                username={username}
              />
            )}
            {!showCard4 && (
              <p className="mt-4">
                {infoUserData.length != 0 && (
                  <div>
                    <span className="text-gray-500">User Info</span>
                    <span className="text-red-900 font-bold">Updated</span>
                  </div>
                )}
              </p>
            )}
          </div>
          <div className="transition-shadow duration-300 bg-white border  shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
            <h1 className="text-xl font-semibold">4.Confirms </h1>
            {showCard3 && (
              <BookingCards3
                sessions={sessions}
                date={dates}
                time={time}
                username={username}
              />
            )}
            {showCard3 &&
              (user_id ? (
                <form
                  action={`${BASE_URL}payment/create-checkout-session`}
                  method="POST"
                >
                  <input type="hidden" name="Id" value={id} />
                  <input type="hidden" name="userId" value={user_id} />
                  <input type="hidden" name="sessions" value={sessions} />
                  <input type="hidden" name="dates" value={dates} />
                  <input type="hidden" name="dataId" value={dataId} />
                  <input type="hidden" name="time" value={time} />
                  <input
                    type="hidden"
                    name="userdata"
                    value={JSON.stringify(infoUserData)}
                  />{" "}
                  <div className="flex justify-between p-5">
                    <button
                      type="submit"
                      className="bg-[#051570] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              ) : (
                <Link to="/signin">
                  <li className="group relative px-3 py-2 text-sm font-medium text-back">
                    Please sign in to make a purchase
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></div>
                  </li>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div class="md:w-1/4 w-full sticky  ">
        <div className="mt-8">
          <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm  hover:shadow">
            <div className="text-center">
              <div className="font-semibold text-medium mb-3">
                Booking For : <span className="text-red-600">{username}</span>
              </div>
            
            </div>
            {showCard1 && (
              <button onClick={handleCard1Select} className="bg-[#051570] hover:bg-blue-700 text-white font-bold py-2 px-4 w-full">
                Continue
              </button>
            )}
              {showCard2 && (
              <button onClick={handleCard2Select} className="bg-[#051570] hover:bg-blue-700 text-white font-bold py-2 px-4 w-full">
                Continue
              </button>
            )}
              {showCard4 && (
              <button onClick={handleUserInfoCards} className="bg-[#051570] hover:bg-blue-700 text-white font-bold py-2 px-4 w-full">
                Continue
              </button>
            )}
            {showCard3 &&
              (user_id ? (
                <form
                  action={`${BASE_URL}payment/create-checkout-session`}
                  method="POST"
                >
                  <input type="hidden" name="Id" value={id} />
                  <input type="hidden" name="userId" value={user_id} />
                  <input type="hidden" name="sessions" value={sessions} />
                  <input type="hidden" name="dates" value={dates} />
                  <input type="hidden" name="dataId" value={dataId} />
                  <input type="hidden" name="time" value={time} />
                  <input
                    type="hidden"
                    name="userdata"
                    value={JSON.stringify(infoUserData)}
                  />{" "}
                  <div className="">
                    <button className="bg-[#051570] hover:bg-blue-700 text-white font-bold py-2 px-4 w-full">
                      ₹ {payamount}
                    </button>
                  </div>
                </form>
              ) : (
                <Link to="/signin">
                  <li className="group relative px-3 py-2 text-sm font-medium text-back">
                    Please sign in to make a purchase
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></div>
                  </li>
                </Link>
              ))}
            <div className="">
              <div className="mt-2  space-y-3">
                <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
                  {CardsContent}
                </p>
              </div>

              <div className="">
                <hr className="mt-2"></hr>
              </div>
              <div className="text-start font-medium text-lg mt-2">
                Booking Summary
              </div>
              <div className="flex justify-between mt-2 ">
                <div className="text-gray-600 font-medium">Session Fee</div>
                <div className="font-light text-">₹ {payamount}</div>
              </div>
              <div className="">
                <hr className="mt-2"></hr>
              </div>
              <div className="flex justify-between mt-2 ">
                <div className="font-medium text-lg">Total </div>
                <div className="text-red-900 font- text-lg">₹ {payamount}</div>
              </div>
              <div className="">
                <hr className="mt-2"></hr>
              </div>
              <div className="mt-2  space-y-3">
                <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
                Read our Policy for Reschedule & Cancellation                </p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBooking;
