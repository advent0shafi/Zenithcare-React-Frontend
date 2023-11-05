import React, { useState } from "react";
import images from "./../../assets/doctor.png";
import { Link } from "react-router-dom";
import PublicAxios from "../../Axios/PublicAxios";
import { BASE_URL } from "../../Interceptor/baseURL";

const BookedSessionsCards = ({
  name,
  sessions,
  date,
  time,
  status,
  buttonText,
  image,
  id,
  amount,
  user_id,
  vendor_id,
}) => {
  const [statuss,setstatuss] = useState(status)
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "cancel":
        return "text-red-500";
      case "pending":
        return "text-red-200";
      default:
        return "text-gray-500"; // Default color if status doesn't match any case
    }
  };
  const handleStatusUpdate = () => {
    console.log("here itrs here", id);
    PublicAxios.put(`booking/bookings-update/${id}/${vendor_id}`, { status: "cancel" })
      .then((response) => {
        console.log("Booking status updated successfully");
        console.log(response.data);
        setstatuss(response.data.status)

      })
      .catch((error) => {
        console.error("Error updating booking status", error);
      });
  };
  const renderButtons = () => {
    if (statuss === "completed" || statuss === "cancel") {
      return null;
    } else {
      return (
        <a
          href="#_"
          onClick={handleStatusUpdate}
          class="relative inline-flex w-32 items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-red-500 rounded-full shadow-md group"
        >
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
            <svg
              style={{ color: "white" }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-delete"
            >
              <path
                fill="white"
                d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
              ></path>
              <line x1="18" y1="9" x2="12" y2="15"></line>
              <line x1="12" y1="9" x2="18" y2="15"></line>
            </svg>
          </span>
          <span class="absolute flex items-center justify-center w-full h-full text-red-500 transition-all duration-300 transform group-hover:translate-x-full ease">
            Cancel
          </span>
          <span class="relative invisible"> Cancel</span>
        </a>
      );
    }
  };

  return (
    <div className="md:pl-20 md:pr-20 mb-6">
      <div className="md:flex shadow-2xl overflow-hidden rounded-lg">
        <div className="md:w-1/5 p-4 bg-white">
          <div className="rounded-full overflow-hidden mt-4">
            <img
              src={image ? `${BASE_URL}media/${image}` : images}
              alt="Doctor Profile"
            />
          </div>
        </div>
        <div className="md:w-3/5 bg-white">
          <div className="p-6 bg-white rounded-lg ">
            <h1 className="mb-4 text-xl font-semibold text-blue-600">{name}</h1>
            <p className="text-base text-gray-600">Amount: $ {amount}</p>
            <p className="text-base text-gray-600">Session: {sessions}</p>
            <p className="text-base text-gray-600">Date: {date}</p>
            <p className="text-base text-gray-600">Time: {time}</p>
            <strong className="text-base text-blue-700">Status:</strong>
            <span
              className={`px-3 py-1 rounded-lg font-semibold ${getStatusColor(
                statuss
              )}`}
            >
              {statuss}
            </span>
          </div>
        </div>
        <div className="md:w-1/5 bg-white md:p-4 p-3 md:pl-9 pl-24">
          <div className="md:mt-24 mb-4  ">
            <Link to={`/userChat?user_id=${user_id}&vendor_id=${vendor_id}&image=${image}&name=${name}`}>
              <a
                href="#_"
                class="relative mb-4 w-32 inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
              >
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-send"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="white"
                      d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
                    ></path>
                  </svg>
                </span>
                <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  {buttonText}
                </span>
                <span class="relative invisible"> {buttonText}</span>
              </a>
            </Link>
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedSessionsCards;
