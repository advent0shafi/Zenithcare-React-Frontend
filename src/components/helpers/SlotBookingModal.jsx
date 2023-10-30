import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
``
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import PublicAxios from "../../Axios/PublicAxios";
import axiosInstance from "../../axiosInstance";

export function SlotBookingModal({addSlotToList }) {
const authstate = useSelector((state) => state.auth);
const today = new Date().toISOString().split('T')[0]; // Get today's date

const [SelectedDate,setSelectedDate] = useState('');
const [SelectedTime,setSelectedTime] = useState('');
const user_Id = authstate.user_id
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleCreateSlots = () => {
    const formData = new FormData();
    formData.append('date', SelectedDate);
    formData.append('time', SelectedTime);
  
    PublicAxios
      .post(`vendor/create-slot/${user_Id}`, formData)
      .then((response) => {
        console.log('Slot created successfully:', response.data);
        JSON.stringify(response.data)
        addSlotToList(response.data)
        toast.success('successfully slot created')
        setOpen(false);

        // Handle any further actions after slot creation if needed
      })
      .catch((error) => {
        toast.error("The Entered Time alredy exists");

        console.error('Error creating slot:', error);
      });
  };

  return (
    <>
      <div onClick={handleOpen} variant="gradient">
        Create an Slote
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader ><span className="text-center"></span></DialogHeader>
        <DialogBody divider>
          <div className="border p-3">
            <h1 className="text-2xl text-center font-semibold mb-4">
              Create Slots
            </h1>
            <div className="mb-4">
           
              <label className="block mb-1 font-semibold">Select Date:</label>
              <input
                type="date"
                className="border rounded p-2 w-full"
                onChange={e=>setSelectedDate(e.target.value)}
                min={today} 
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Select Time:</label>
              <select
                className="border rounded p-2 w-full"
                onChange={e=>setSelectedTime(e.target.value)}
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
              onClick={handleCreateSlots}
            >
              Create Slot
            </button>
          </div>
        </DialogBody>
        <Toaster />

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
