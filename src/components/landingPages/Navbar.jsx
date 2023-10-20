import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark,faUser } from "@fortawesome/free-solid-svg-icons";

import logo1 from "./../../assets/logo2.png";
import lock from "./../../assets/lock.png";
import axiosInstance from "../../axiosInstance";
import { Link} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { userlogout } from "../../redux/AuthContext";


const Navbar = () => {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);
  const [logout,setLogout] = useState(false);
  const authstate = useSelector((state)=> state.auth)
  
useEffect(() => {

  console.log(authstate)
  if(authstate.accessToken != null){
setLogout(true)
  }else{
    setLogout(false)
  }
}, [])

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

        <div className="hidden md:flex items-center">
          <ul className="flex gap-4">
          <Link to="/"><li>Home</li></Link>  
          <Link to="/Therapist"> <li>Therapist</li></Link>
            <Link to="/blog"><li>Blog</li></Link>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="hidden md:flex">
        {logout?<button className="flex justify-between items-center bg-transparent px-6 gap-2">

            <FontAwesomeIcon icon={faUser} style={{"--fa-primary-color": "#051570", "--fa-secondary-color": "#000524",}} />
            <Link to="/profile"> {authstate.username} </Link>
          </button>:<button className="flex justify-between items-center bg-transparent px-6 gap-2">
          <img className="h-[20px]" src={lock} />
            <Link to="/login">    Login</Link>
          </button>}
      {logout?  <button onClick={handleLogout} className="px-8 py-3 rounded-lg bg-[#051570] text-white font-bold">
       Logout
        </button>:<button className="px-8 py-3 rounded-lg bg-[#051570] text-white font-bold">
        <Link to="/signup">Signup for free</Link>
        </button>}
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
          <li className="p-4 hover:bg-gray-100">Home</li>
          <li className="p-4 hover:bg-gray-100">Therapist</li>
          <li className="p-4 hover:bg-gray-100">Blog</li>
          <li className="p-4 hover:bg-gray-100">About</li>
          <li className="p-4 hover:bg-gray-100">Contact</li>
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

export default Navbar;
