import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faUser,
  faBell,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import logo1 from "./../../assets/logo2.png";
import lock from "./../../assets/lock.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userlogout } from "../../redux/AuthContext";
import { Alert } from "@material-tailwind/react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

const NavbarVendor = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [socket, setSocket] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleClick = () => setToggle(!toggle);
  const [logout, setLogout] = useState(false);
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;
  const roomName = user_id;
  console.log("room name", roomName);

  useEffect(() => {
    console.log(authstate);
    const newSocket = new WebSocket(
      `wss://www.zenith-care.online/ws/notfications/${roomName}/`
    );
    setSocket(newSocket);
    if (authstate.accessToken != null) {
      setLogout(true);
    } else {
      setLogout(false);
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const message_get = data.message_content;
        // Update the state with the received message
        setReceivedMessages((prevMessages) => [...prevMessages, message_get]);
      };
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault(); // Fix the typo here

    console.log("Logging out...");
    dispatch(userlogout());
    setLogout(false);
  };

  return (
    <div className="w-full h-[80px] md:p-6 bg-white border-b">
      <div className="md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center">
        <img src={logo1} className="w-[230px]" />

        <div className="hidden md:flex">
          {logout && (
            <>
              <button
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon
                  icon={faBell}
                  size="xl"
                  style={{ color: "#051570" }}
                />

                <span className="absolute inset-0 object-right-top -mr-6">
                  <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                    {receivedMessages.length}
                  </div>
                </span>
              </button>
              {isDropdownVisible && (
                <div className="absolute top-20 right-0 w-96 bg-white border border-gray-200 shadow-lg overflow-y-scroll h-96">
                  <div className="p-3">
                    {receivedMessages.length == 0 && (
                      <p>No Notfications so far</p>
                    )}
                    {receivedMessages.map((message, index) => (
                      <div className="mb-3" key={index}>
                        <Alert
                          icon={<Icon />}
                          className="rounded-md border-l-8 border-[#051570] bg-[#2ec946]/10 font-medium text-[#051570]"
                        >
                          {message}
                        </Alert>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {logout ? (
            <button className="flex justify-between items-center bg-transparent px-6 gap-2">
            
            </button>
          ) : (
            <button className="flex justify-between items-center bg-transparent px-6 gap-2">
              <img className="h-[20px]" src={lock} />
              <Link to="/vendor/login"> Login</Link>
            </button>
          )}
          {logout ? (
            // <button
            //   onClick={handleLogout}
            //   className="px-8 py-3 rounded-lg bg-[#051570] text-white font-bold"
            // >
            //   Logout
            // </button>

            <button
            onClick={handleLogout}
            class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[#051570] transition-all duration-150 ease-in-out rounded-2xl bg-gray-50 group"
            >
              <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#051570] group-hover:h-full"></span>
              <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"></span>
              <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <div className="flex justify-center gap-4">
                  <div className="ml-4">
                  <FontAwesomeIcon icon={faSignOutAlt} size="lg" style={{color: "#FFFFFF",}} />
                  </div>
                  <p className="text-white font-bold  hover:text-[#051570]">
                    Logout
                  </p>
                </div>
              </span>
              <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-transparent">
                <div className="flex gap-3">
                  <div className="">
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        "--fa-primary-color": "#051570",
                        "--fa-secondary-color": "#000524",
                      }}
                    />
                  </div>

                  <div className=""> {authstate.username}</div>
                </div>
              </span>
            </button>
          ) : (
            // <a
            //   href="#_"
            //   class="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
            // >
            //   <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-[#051570] opacity-[3%]"></span>
            //   <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-1000 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-[#051570] opacity-100 group-hover:-translate-x-8"></span>
            //   <span class="relative w-full text-left text-white transition-colors duration-700 ease-in-out group-hover:text-white">
            //     Logout{" "}
            //   </span>
            //   <span class="absolute inset-0 border-2 border-[#051570] rounded-full"></span>
            // </a>
            //             <button class="relative inline-flex items-center justify-center p-4 px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#051570] rounded-full shadow-md group">
            //               <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#051570] group-hover:translate-x-0 ease">
            // <FontAwesomeIcon
            //   icon={faUser}
            //   style={{
            //     "--fa-primary-color": "#051570",
            //     "--fa-secondary-color": "#000524",
            //   }} />
            //                 username
            //               </span>
            //               <span class="absolute flex items-center justify-center w-full h-full text-[#051570] font-bold transition-all duration-300 transform group-hover:translate-x-full ease">
            // Logout
            //  </span>
            //               <span class="relative invisible">Logout</span>
            //             </button>
            <button className="px-8 py-3 rounded-lg bg-[#051570] text-white font-bold">
              <Link to="/vendor/signup">Signup for free</Link>
            </button>
          )}
        </div>
        <div className="md:hidden p-3" onClick={handleClick}>
          {toggle ? (
            <FontAwesomeIcon icon={faXmark} bounce size="xl" />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>
      </div>
      <div
        className={
          toggle ? "absolute z-10 p-4 bg-white w-full px-8 md:hidden" : "hidden"
        }
      >
        <ul>
          <Link to="/vendor/">
            <li className="p-4 hover:bg-gray-100">
              <div className="flex">
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
              </div>
            </li>
          </Link>
          <Link to="/vendor/chat">
            <li className="p-4 hover:bg-gray-100">
              <div className="flex">
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
              </div>
            </li>
          </Link>
          <Link to="/vendor/payment">
            <li className="p-4 hover:bg-gray-100">
              <div className="flex">
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
              </div>
            </li>
            <li className="p-4 hover:bg-gray-100">
              <div className="flex">
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
              </div>
            </li>
          </Link>
          <Link to={`/vendor/booking/${authstate?.user_id}`}>
            <li className="p-4 hover:bg-gray-100">
              <div className="flex">
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
              </div>
            </li>
          </Link>
          <Link to="/vendor/bookings-sessions">
            <li className="p-4 hover:bg-gray-100">
              <div className="flex">
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
              </div>
            </li>
            <li className="p-4 hover:bg-gray-100">
              <div className="flex">
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
              </div>
            </li>
          </Link>
          <div className="flex flex-col my-4 gap-4 ">
            <button className="border border-[#051570] rounded-lg flex justify-center font-bold items-center bg-transparent px-6 gap-2 py-4">
              <img className="h-[20px]" src={lock} />
              Login
            </button>
            <button className="px-8 py-5 rounded-lg bg-[#051570] text-white font-bold">
              Signup for free
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavbarVendor;
