import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axiosInstance from "../../axiosInstance";

const FaqCards = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [slotAvailable, setSlotAvailable] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slotid,setSlot]=useState('')

  const handleOpen = () => {
    setOpen(!open);
  };
const handleSubmit=(id) => {
console.log(id)
}
  useEffect(() => {
    axiosInstance
      .get(`vendor/create-slot/${userId}`)
      .then((response) => {
        JSON.stringify(response.data);
        console.log("Slot created successfully:", response.data.userdata);
        setSlotAvailable(response.data.userdata);
      })
      .catch((error) => {
        console.error("Error creating slot:", error);
      });
  }, [userId]);

  const uniqueDates = Array.from(new Set(slotAvailable.map(slot => slot.date)));

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Book Sessions
      </Button>
      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          <span className="text-center justify-center">Time Slot Available</span>
          <button
            onClick={handleOpen}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </DialogHeader>
        <DialogBody>
          {uniqueDates.map((date) => {
            return (
              <div className="" key={date}>
                  <div
                    className="px-3 py-2 mb-1 rounded-full border cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300"
                    onClick={() => handleDateSelect(date)}
                  >
                    {date}
                  </div>
                  {selectedDate === date && (
                    <div>
                      {slotAvailable
                        .filter((slot) => slot.date === date)
                        .map((slot) => (
                          <button  key={slot.id} onClick={()=>handleSubmit(slot.id)} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
 {slot.time}{' '}</button>
                 
                        ))}
                    </div>
                  )}
                </div>
            );
          })}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="white" className="mr-1 bg-red-900">
            <span>Confirmations</span>
          </Button>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default FaqCards;
