import React from 'react'
import image from '../../assets/profiles.jpeg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";


const FeedbackCard = () => {
  return (
    <div className='bg-white border p-8 rounded-3xl shadow-xl my-8 mx-2'>
        <div className='flex justify-between'>
            <div className='flex gap-4'> 
                 <img src={image} className='rounded-full w-[100px] h-[100px]' alt="" /> 
                    <div>
                        <h1>Jenny Wilson</h1>
                        <p>Msc Psycology</p>
                    </div>
            </div>
           <FontAwesomeIcon icon={faQuoteLeft} size="2xl" style={{color: "#051570",}} />
        </div>
        <div className='py-8'>
            <h3 className='text-lg'> With Online therapy, people can greatly succeed from issues such as
            sadness, worrying, stress, depression, phobias, marital problems,
            self-esteem problems and many more issues. Also, therapy can be
            extremely beneficial for individuals and families</h3>
        </div>
       
    </div>
  )
}

export default FeedbackCard