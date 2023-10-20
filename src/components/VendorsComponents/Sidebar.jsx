import React from 'react'
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse,faUser,faComment } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const authstate = useSelector((state)=> state.auth) 
  
  
  return (

     <div
        className="mt-16 fixed z-10 p-4 md:h-full md:w-1/5 bg-[#7488fa] px-8 hidden md:block">
        <ul>
         <Link to="/vendor/home"> <li className="p-4 hover:bg-[#2c3672] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faHouse} size="sm"/></span>Home</li></Link>
         <Link to="/vendor/profile"> <li className="p-4 hover:bg-[#2c3672] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faUser} size="sm"/></span>profile</li></Link>
         <Link to="/vendor/chat"> <li className="p-4 hover:bg-[#2c3672] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faComment} /></span>Chat</li></Link>

         <Link to={`/vendor/booking/${authstate?.user_id}`}>  <li className="p-4 hover:bg-[#2c3672] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faHouse} size='sm'/></span>Booking Slot</li></Link>
          <li className="p-4 hover:bg-[#2c3672] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faHouse} size="sm"/></span>Chat</li>
          <li className="p-4 hover:bg-[#2c3672] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faHouse} size="sm"/></span>Dashboard</li>
          <div className="flex flex-col my-4 gap-4 text-white">
            <button className="border text-gray-950 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg flex justify-center font-bold items-center bg-transparent px-6 gap-2 py-4">

              Logout
            </button>
            
          </div>
        </ul>
      </div>
  )
}

export default Sidebar