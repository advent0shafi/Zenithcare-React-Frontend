import React, { useState, useEffect } from "react";
import BookingCards from "../../../components/helpers/BookingCards";
import BookingCards2 from "../../../components/helpers/BookingCards2";
import BookingCards3 from "../../../components/helpers/BookingCards3";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PublicAxios from "../../../Axios/PublicAxios";
import { BASE_URL } from "../../../Interceptor/baseURL";
import QueryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const UserBooking = ({ payamount }) => {
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;
  const username = authstate.username;
  const { id } = useParams();
  const [sessions, setSessions] = useState("");
  const [dates, setDates] = useState("");
  const [time, setTime] = useState("");
  const [dataId, setDataId] = useState("");
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(false);
  const [showCard3, setShowCard3] = useState(false);
  const handlesession = (e) => {
    setSessions(e);
  };
  const handleDates = (e) => {
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
    setShowCard2(false);
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
    <div className="flex flex-col items-center p-4 ">
      <div className=" bg-white shadow-md text-black p-6 rounded-lg mb-4 w-full">
        <div className="justify-end items-end md:pl-96">
          {!showCard1 && (
            <p
              className="text-green-800 md:pl-96"
              onClick={() => setShowCard1(true)}
            >
              Change
            </p>
          )}
        </div>
        {showCard1 ? (
          <h5 className="text-xl font-semibold">1.Select Mode Of Sessions </h5>
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

      <div className="bg-white shadow-md text-black p-6 rounded-lg mb-4 w-full">
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
              onClick={() => setShowCard2(true)}
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

      <div className="bg-white  shadow-md text-black p-6 rounded-lg mb-4 w-full">
        <h1 className="text-xl font-bold mb-2">3.Confirms </h1>
        {showCard3 && <BookingCards3  sessions={sessions} username={username} />}
        {showCard3 &&
          (user_id ? (
            <form
              action={`${BASE_URL}/payment/create-checkout-session`}
              method="POST"
            >
              <input type="hidden" name="Id" value={id} />
              <input type="hidden" name="userId" value={user_id} />
              <input type="hidden" name="sessions" value={sessions} />
              <input type="hidden" name="dates" value={dates} />
              <input type="hidden" name="dataId" value={dataId} />
              <input type="hidden" name="time" value={time} />
              <div className="flex justify-between p-5">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Confirm
                </button>
                <button className="font-medium">Total: ₹ {payamount}</button>
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
  );
};

export default UserBooking;
