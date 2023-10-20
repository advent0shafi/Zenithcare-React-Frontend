import React from "react";

const BookingCards3 = ({sessions,username}) => {
  return (
    <div className="p-4 mb-4">
      <p>Please Look at this {username}</p>

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

        <p className="text-green-800">1 x 50 min. session in {sessions}</p>
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

        <p className="text-green-800">Your Selected date is </p>
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

        <p className="text-green-800">Included email support with Dr Pooja Sharma for 48-hours after session</p>
      </div>
    </div>
  );
};

export default BookingCards3;
