import React from 'react'

const Buttons = ({filter}) => {
  return (
    <div>
                <button className="bg-transparent hover:bg-[#051570]  text-[#051570] text-xl font-bold hover:text-white py-2 px-4 border border-[#051570] hover:border-transparent shadow-lg rounded-[200px] transition duration-300 ease-in-out transform hover:scale-105">{filter}</button>

    </div>
  )
}

export default Buttons