import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCircleCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import images from './../../assets/logiko.png'

const Cards = (props) => {
  const { image, name, degree, specialization, availabilityDate } = props;

  return (
    <div className='bg-white drop-shadow-md overflow-hidden rounded-2xl mr-3 my-4 md:transition duration-300 ease-in-out transform hover:scale-105'>
      <img className='h-40 w-full object-cover' src={ image?`http://127.0.0.1:8000/media/${image}`:images } alt="People" />

      <div className='p-5 border border-b'>
        <h1 className="font-bold text-xl">{name} <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#02e840" }} /></h1>
        <h1 className="text-xl pb-3">
          {degree}
        </h1>
        <h1 className="font-bold text-lg"><FontAwesomeIcon icon={faSun} size="xl" style={{ color: "#051570" }} /> <span className='px-2'>Specialization</span> </h1>
        <p className=''>{specialization}</p>
      </div>
      <div>
        <h1 className="font-bold text-center text-lg"><FontAwesomeIcon icon={faClock} style={{ color: "#051570" }} /> Available </h1>
        <p className='text-center pb-3'>{availabilityDate}</p>
      </div>
      <div className='absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold'>
        Verified
      </div>
    </div>
  )
}

export default Cards;
