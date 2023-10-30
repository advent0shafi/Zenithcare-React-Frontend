import React from "react";

const BookingCards3 = ({sessions,username,time,date}) => {
const dates = new Date(date);
const options = { weekday: 'short', day: '2-digit', month: 'short' };
const formattedDate = dates.toLocaleDateString('en-US', options);
  return (
    <div className="p-4 mb-4">
      <p className="text-base font-semibold ">Booking For  :  <span className="text-red-900 font-bold text-lg">{username}</span></p>

      <div className="flex mt-3">
        <svg className="h-5 w-5 mr-3" viewBox="0 0 52 52">
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="blue"
            stroke="white"
            strokeWidth="5" // Adjust the stroke width to increase thickness
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-20"
            stroke="white"
            strokeWidth="5" // Adjust the stroke width to increase thickness
          />
        </svg>

        <p className="text-green-800">1 x 50 min. session in <span className="font-bold">{sessions}</span></p>
      </div>
      <div className="flex mt-3">
        <svg className="h-5 w-5 mr-3" viewBox="0 0 52 52">
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="blue"
            stroke="white"
            strokeWidth="5" // Adjust the stroke width to increase thickness
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-20"
            stroke="white"
            strokeWidth="5" // Adjust the stroke width to increase thickness
          />
        </svg>

        <p className="text-green-800">Your details has been  <span className="font-bold">updated</span> </p>
      </div>
      <div className="flex mt-3">
        <svg className="h-5 w-5 mr-3" viewBox="0 0 52 52">
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="blue"
            stroke="white"
            strokeWidth="5" // Adjust the stroke width to increase thickness
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-20"
            stroke="white"
            strokeWidth="5" // Adjust the stroke width to increase thickness
          />
        </svg>

        <p className="text-green-800">Your Selected date is <span className="font-bold">{formattedDate}</span>  </p>
      </div>
      <div className="flex mt-3">
        <svg className="h-5 w-5 mr-3" viewBox="0 0 52 52">
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="blue"
            stroke="white"
            strokeWidth="5" // Adjust the stroke width to increase thickness
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-20"
            stroke="white"
            strokeWidth="5" // Adjust the stroke width to increase thickness
          />
        </svg>

        <p className="text-green-800">Your Selected time is <span className="font-bold">{time} Ist  </span></p>
      </div>
    </div>
  );
};

export default BookingCards3;
