import React from 'react'
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse,faUser } from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {
  return (
  <div className='shadow-lg bg-[#051570]'>
     <div
        className="absolute z-10 p-4 md:h-full md:w-1/5 bg-[#051570] px-8 hidden md:block">
        <ul>
         <Link to="/vendor/home"> <li className="p-4 hover:bg-[#0b102b] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faHouse} size="sm"/></span>Home</li></Link>
         <Link to="/vendor/profile"> <li className="p-4 hover:bg-[#0b102b] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faUser} size="sm"/></span>profile</li></Link>
          <li className="p-4 hover:bg-[#0b102b] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faHouse} size='sm'/></span>Articles</li>
          <li className="p-4 hover:bg-[#0b102b] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faHouse} size="sm"/></span>Chat</li>
          <li className="p-4 hover:bg-[#0b102b] text-white text-lg"><span className='mr-3'><FontAwesomeIcon icon={faHouse} size="sm"/></span>Dashboard</li>
          <div className="flex flex-col my-4 gap-4 text-white">
            <button className="border text-gray-950 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg flex justify-center font-bold items-center bg-transparent px-6 gap-2 py-4">

              Logout
            </button>
            
          </div>
        </ul>
      </div>
  </div>
  )
}

export default Sidebar