import React from 'react'
import image from "../assets/girls2.png"
import { Link } from 'react-router-dom'

const Therapist = () => {
  return (
    <div className="w-full md:pl-7 pl-2 bg-white   ">
    <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[350px]">
    <div className="flex items-center justify-center md:order-first order-first">
        <img className="w-[500px] mx-auto" src={image} />
      </div>
      <div className="flex flex-col justify-start gap-3 py-24">
       
        <h1 className="py-2 text-3xl font-semibold">
    Are You <span className='text-[#051570] '>Therapist</span > or <span className='text-[#051570] '>Psycharists</span> Join Our Community
        </h1>
        <p className="py-2 text-lg text-gray-600">
        If you're a therapist or psychiatrist looking to make a difference in people's lives, we'd love to meet you.        </p>
        <div className=" max-w-[650px] py-2 flex md:justify-start justify-center">
          
          <div className="mr-4 mt-2">
            
          <button className="bg-transparent hover:bg-[#051570] w-[300px] h-[60px] text-[#051570] text-xl font-bold hover:text-white py-2 px-4 border border-[#051570] hover:border-transparent shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] rounded-[200px] transition duration-300 ease-in-out transform hover:scale-105"><Link to="/vendor/signup">Apply to Join   </Link></button>
       
          </div>
        </div>
      </div>
      
    </div>
  </div>
  )
}

export default Therapist