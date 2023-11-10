import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faComment } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const authstate = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  // Function to check if a link is active
  const isLinkActive = (to) => {
    return location.pathname === to;
  };

  return (
    <div className="mt-16 fixed z-10 p-4 md:h-full md:w-1/5 bg-[#7488fa] px-8 hidden md:block">
      <ul>
        <li
          onClick={() => {
            navigate("/vendor/");
          }}
          className={`flex p-4 hover:bg-[#2c3672] text-white text-lg ${
            isLinkActive("/vendor/") ? "bg-[#2c3672]" : ""
          }`}
        >
          <span className="mr-3">
            <svg
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </span>
          Profile
        </li>

        <li
          onClick={() => {
            navigate("/vendor/chat");
          }}
          className={`flex p-4 hover:bg-[#2c3672] text-white text-lg ${
            isLinkActive("/vendor/chat") ? "bg-[#2c3672]" : ""
          }`}
        >
          <span className="mr-3">
            <svg
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
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </span>
          Chat
        </li>
        <li
          onClick={() => {
            navigate("/vendor/payment");
          }}
          className={`flex p-4 hover-bg-[#2c3672] text-white text-lg ${
            isLinkActive("/vendor/payment") ? "bg-[#2c3672]" : ""
          }`}
        >
          <span className="mr-3">
            <svg
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
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          Payment
        </li>
        <li
          onClick={() => {
            navigate(`/vendor/booking/${authstate?.user_id}`);
          }}
          className={`flex p-4 hover-bg-[#2c3672] text-white text-lg ${
            isLinkActive(`/vendor/booking/${authstate?.user_id}`)
              ? "bg-[#2c3672]"
              : ""
          }`}
        >
          <span className="mr-3">
            <svg
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
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
              />
            </svg>
          </span>
          Booking Slot
        </li>
        <li
          onClick={() => {
            navigate("/vendor/bookings-sessions");
          }}
          className={`flex p-4 hover-bg-[#2c3672] text-white text-lg ${
            isLinkActive("/vendor/bookings-sessions") ? "bg-[#2c3672]" : ""
          }`}
        >
          <span className="mr-3">
            <svg
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
                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
              />
            </svg>
          </span>
          Sessions
        </li>
        <li
          onClick={() => {
            navigate("/vendor/wallet-vendor");
          }}
          className={`flex p-4 hover-bg-[#2c3672] text-white text-lg ${
            isLinkActive("/vendor/wallet-vendor") ? "bg-[#2c3672]" : ""
          }`}
        >
          <span className="mr-3">
            <svg
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
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
              />
            </svg>
          </span>
          Wallet
        </li>
          <li
           onClick={() => {
            navigate("/vendor/vendor-blog");
          }}
            className={`flex p-4 hover-bg-[#2c3672] text-white text-lg ${
              isLinkActive("/vendor/vendor-blog") ? "bg-[#2c3672]" : ""
            }`}
          >
            <span className="mr-3">
              <svg
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </span>
            Blog
          </li>
        
        <div className="flex flex-col my-4 gap-4 text-gray-500">
          <button className="border text-gray-950 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg flex justify-center font-bold items-center bg-transparent px-6 gap-2 py-4">
            Logout
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
