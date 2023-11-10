import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import toast, { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Radio, Button } from "@material-tailwind/react";
import PublicAxios from "../../../Axios/PublicAxios";

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
        {uniqueDates.length === 0 ? (
          <div className="no-available-date-message">No available date</div>
        ) : (
          uniqueDates.map((date, index) => {
            const parsedDate = new Date(date);

            const months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];

            const dayOfWeek = new Intl.DateTimeFormat("en", {
              weekday: "short",
            }).format(parsedDate);

            const dayOfMonth = parsedDate.getDate();
            const month = months[parsedDate.getMonth()];

            const formattedDate = `${dayOfWeek} - ${dayOfMonth} - ${month}`;

            return (
              <div
                key={index}
                className={`date-box ${
                  index === currentDateIndex ? "active" : ""
                }`}
                onClick={() =>
                  handleSelectItem(
                    "Item X",
                    date,
                    dateData.find((item) => item.date === date).times,
                    dateData.find((item) => item.date === date).id
                  )
                }
              >
                <Button variant="outlined">
                  <span className="text-sm">{formattedDate}</span>
                </Button>
              </div>
            );
          })
        )}
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
          className="bg-[#172786] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md"
        >
          Continue
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default BookingCards2;
