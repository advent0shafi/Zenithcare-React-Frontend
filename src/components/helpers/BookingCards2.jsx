import React, { useState, useEffect, useRef } from "react";
import PublicAxios from "../../Axios/PublicAxios";
import Slider from "react-slick";
import toast, { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Radio } from "@material-tailwind/react";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

const BookingCards2 = ({
  onSelect,
  selectedItems,
  id,
  setectedTimes,
  setDateId,
}) => {
  const [dateData, setDateData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [timeId, setTimeId] = useState([]);
  const [time_Id, setTime_Id] = useState("");
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const datesRef = useRef(null);

  const handleSelectItem = (item, date, times, time_id) => {
    setSelectedDate(date);
    setAvailableTimes(times);
    selectedItems(date);

    setTimeId(time_id);
  };

  const handleNextCards = () => {
    if (time_Id) {
      onSelect();
    } else {
      toast.error("Please Select time !!");
    }
  };

  const handleSubmit = (id, items) => {
    setTime_Id(id);
    setectedTimes(items);
    setDateId(id);
  };

  const uniqueDates = [...new Set(dateData.map((data) => data.date))];

  useEffect(() => {
    PublicAxios.get(`vendor/create-slot/${id}`)
      .then((response) => {
        const userData = response.data.userdata;

        if (Array.isArray(userData) && userData.length > 0) {
          const formattedData = userData.map((item) => ({
            id: item.id, // Assuming id is part of the data from the API
            date: item.date,
            times: [item.time],
          }));
          setDateData(formattedData);
          console.log("Slot created successfully:", userData);
        } else {
          console.error("Error: userdata is not in the expected format.");
        }
      })
      .catch((error) => {
        console.error("Error creating slot:", error);
      });
  }, [id]);

  return (
    <div className="p-4 mb-4">
      <Slider {...settings}>
        {uniqueDates.map((date, index) => (
          <div
            key={index} // Use index as the key for unique dates
            className={`date-box ${index === currentDateIndex ? "active" : ""}`}
            onClick={() =>
              handleSelectItem(
                "Item X",
                date,
                dateData.find((item) => item.date === date).times,
                dateData.find((item) => item.date === date).id
              )
            }
          >
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              {date}
            </button>
          </div>
        ))}
      </Slider>
      <div className="times-container mt-6">
        {selectedDate && (
          <div>
            <h1>Available Time</h1>
            {dateData
              .filter((data) => data.date === selectedDate)
              .map((data) => (
                <div key={data.id}>
                  <ul>
                    {data.times.map((time, index) => (
                      <li
                        onClick={() => handleSubmit(data.id, time)}
                        key={index}
                      >
                        <div className="flex items-center">
                          <Radio name="color" color="blue" />
                          <p className="text-red-900 font-bold ml-2">{time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={handleNextCards}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Continue
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default BookingCards2;
