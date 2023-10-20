import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const Datepickers = () => {
   
  return (
    <div>
     <div className="container w-96 mx-auto p-8 mb-40 bg-gray-700 ">
 
    <h1 className="text-2xl font-semibold mb-4">Create Slots</h1>
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Select Date:</label>
      <input
        type="date"
        className="border rounded p-2 w-full"
        // onChange={e=>setSelectedDate(e.target.value)}
      />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Time:</label>
        <select
          className="border rounded p-2 w-full"
          // onChange={e=>setSelectedTime(e.target.value)}
        >
          <option value="">Select Time</option>
          <option value="10 AM">10 AM</option>
          <option value="10:20AM">10:20 AM</option>
          <option value="11:40AM">11:40 AM</option>
          <option value="12:00 PM">12 PM</option>
          <option value="12:20 PM">12:20 PM</option>
          <option value="2:40 PM">2:40 PM</option>
          <option value="3 PM">3:00 PM</option>
          <option value="3:20 PM">3:20 PM</option>
          <option value="3:40 PM">3:40 PM</option>
          <option value="4:00 PM">4:00 PM</option>
      
        </select>
        </div>
     
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        // onClick={handleCreateSlots}
      >
        Create Slot
      </button>
    
    </div>
</div>
  )
}

export default Datepickers