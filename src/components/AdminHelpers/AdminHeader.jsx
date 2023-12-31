import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import logo1 from "./../../assets/logo2.png";
import lock from "./../../assets/lock.png";
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userlogout } from "../../redux/AuthContext";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);
  const [logout, setLogout] = useState(false);
  const authstate = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(authstate);
    if (authstate.accessToken != null) {
      setLogout(true);
    } else {
      setLogout(false);
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
      <div className="md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-end items-center">
        <div className="hidden md:flex">
          {logout ? (
            <button className="flex justify-between items-center bg-transparent px-6 gap-2">
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  "--fa-primary-color": "#051570",
                  "--fa-secondary-color": "#000524",
                }}
              />
              {authstate.username}
            </button>
          ) : (
            <button className="flex justify-between items-center bg-transparent px-6 gap-2">
              <img className="h-[20px]" src={lock} />
              <Link to="/vendor/login"> Login</Link>
            </button>
          )}
          {logout ? (
            <button
              onClick={handleLogout}
              className="px-8 py-3 rounded-lg bg-[#051570] text-white font-bold"
            >
              Logout
            </button>
          ) : (
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
        <Link to="/admin">

          <li  className="p-4 flex gap-3 hover:bg-gray-100">
            <span className="text-left">
              {" "}
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </span>
            Home
          </li>
          </Link>
          <Link  to="/admin/userlist">
          <li className="p-4 flex gap-3 hover:bg-gray-100">
            {" "}
            <span className="text-left">
              {" "}
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>{" "}
            </span>
            User List
          </li>
          </Link>
          <Link to="/admin/vendorlist">
          <li className="p-4 flex gap-3 hover:bg-gray-100">
            {" "}
            <span className="text-left">
              {" "}
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
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>{" "}
            </span>
            Verify List
          </li>
          </Link>
              <Link to="/admin/approvelist">
          <li className="p-4 flex gap-3 hover:bg-gray-100">
            {" "}
            <span className="text-left">
              {" "}
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
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>{" "}
            </span>
            Vendor List
          </li>
          </Link>
              <Link to="/admin/payment-list">
          <li className="p-4 flex gap-3 hover:bg-gray-100">
            {" "}
            <span className="text-left">
              {" "}
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
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>{" "}
            </span>
            Payment
          </li>
          </Link>
              <Link to="/admin/payment-pending">
          <li className="p-4 flex gap-3 hover:bg-gray-100">
            {" "}
            <span className="text-left">
              {" "}
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
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>{" "}
            </span>
            Payment Pending
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

export default AdminHeader;
