import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import logo1 from "./../../assets/logo2.png";
import lock from "./../../assets/lock.png";
import axiosInstance from "../../axiosInstance";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useSelector, useDispatch } from "react-redux";
import { userlogout } from "../../redux/AuthContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);
  const [logout, setLogout] = useState(false);
  const authstate = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    console.log(authstate);
    if (authstate.accessToken != null) {
      setLogout(true);
    } else {
      setLogout(false);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    console.log("Logging out...");
    dispatch(userlogout());
    setLogout(false);
    navigate("/"); // Use navigate to redirect to the home page
  };

  return (
    <div className="w-full h-[80px] md:p-6 bg-white border-b">
      <div className="md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center">
        <img src={logo1} className="w-[230px]" />

        <div className="hidden md:flex items-center">
          <ul className="flex gap-4">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/Therapist")}>Therapist</li>
            <li onClick={() => navigate("/blog")}>Blog</li>
            <li onClick={() => navigate("/about")}>About</li>
            {/* <li>Contact</li> */}
          </ul>
        </div>
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
              <button onClick={() => navigate("/profile")}>
                {authstate.username}
              </button>
            </button>
          ) : (
            <button className="flex justify-between items-center bg-transparent px-6 gap-2">
              <img className="h-[20px]" src={lock} />
              <button onClick={() => navigate("/login")}>Login</button>
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
              <button onClick={() => navigate("/signup")}>
                Signup for free
              </button>
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
          <li className="p-4 hover:bg-gray-100" onClick={() => navigate("/")}>
            Home
          </li>
          <li
            className="p-4 hover-bg-gray-100"
            onClick={() => navigate("/Therapist")}
          >
            Therapist
          </li>
          <li
            className="p-4 hover-bg-gray-100"
            onClick={() => navigate("/blog")}
          >
            Blog
          </li>
          <li
            className="p-4 hover-bg-gray-100"
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li className="p-4 hover-bg-gray-100">Contact</li>
          <div className="flex flex-col my-4 gap-4 ">
          {logout ? (
            <button className="flex justify-center items-center bg-transparent px-6 gap-2">
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  "--fa-primary-color": "#051570",
                  "--fa-secondary-color": "#000524",
                }}
              />
              <button onClick={() => navigate("/profile")}>
                {authstate.username}
              </button>
            </button>
          ) : (
            <button className="flex justify-between items-center bg-transparent px-6 gap-2">
              <img className="h-[20px]" src={lock} />
              <button onClick={() => navigate("/login")}>Login</button>
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
              <button onClick={() => navigate("/signup")}>
                Signup for free
              </button>
            </button>
          )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
