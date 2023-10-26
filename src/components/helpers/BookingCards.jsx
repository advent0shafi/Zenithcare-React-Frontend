import React, { useState, useEffect, useRef } from "react";
import PublicAxios from "../../Axios/PublicAxios";
import toast, { Toaster } from "react-hot-toast";
import { Radio } from "@material-tailwind/react";

const BookingCards = ({ onSelect, selectedItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [sessions, setSessions] = useState([]);

  useEffect;
  const handleSelectItem = (item) => {
    setSelectedItem(item);

    selectedItems(item);
  };
  const handleNextCard = () => {
    if (selectedItem) {
      onSelect();
    } else {
      toast.error("Please select the session type");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PublicAxios.get("booking/session_modes/");
        console.log(response.data);
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" p-4 mb-4">
      <ul className="mb-4">
        {sessions.map((item) => (
          <li
            className="flex items-center"
            key={item.id}
            onClick={() => handleSelectItem(item.name)}
          >
            <Radio name="color" color="blue" />
            <p className="font-medium` ml-2">{item.name}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={handleNextCard}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Continue
      </button>
      <Toaster />
    </div>
  );
};

export default BookingCards;
