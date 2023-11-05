import React, { useState, useEffect } from "react";
import PublicAxios from "../../Axios/PublicAxios";

const VendorBookedCards = ({
  booking_id,
  user_img,
  user_name,
  therapist_amount,
  therapist_name,
  date_of_booking,
  status,
  payment_type,
  payment_Id,
  mode_of_session,
  therapist_img,
  time,
  therapist_id,
}) => {
  const [userInfo, setUserInfo] = useState("");
  const [openInfo, setInfo] = useState(false);
  const [Userstatus, setStatus] = useState(status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PublicAxios.get(
          `booking/user-details/${booking_id}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log(response.data);

        setUserInfo(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleComplete = () => {
    console.log("here it's here", booking_id);
    PublicAxios.put(`booking/bookings-complete/${booking_id}/`, {
      status: "completed",
    })
      .then((response) => {
        console.log(response.data.status);
        setStatus(response.data.status);
        alert("Booking status updated successfully");
      })
      .catch((error) => {
        alert("Error updating booking status", error);
      });
  };

  return (
    <div className="transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black rounded-lg mb-4 w-full p-4 m-4">
      <div className="bg-[#F8FAFF]">
        <img
          src={`http://127.0.0.1:8000/media/${user_img}`}
          alt="User"
          className="w-16 h-16 rounded-full mx-auto"
        />
      </div>

      <h3 className="text-xl font-semibold mt-2 text-center">{user_name}</h3>
      <p className="text-gray-500 text-center">{mode_of_session}</p>
      <div className="mt-4">
        <p>
          <strong>Date:</strong> {date_of_booking}
        </p>
        <p>
          <strong>Status:</strong> {Userstatus ? Userstatus : status}
        </p>

        {openInfo && (
          <div>
            <p>
              <strong>Geneder:</strong> {userInfo.gender}
            </p>
            <p>
              <strong>Age:</strong> {userInfo.age}
            </p>
            <p>
              <strong>Relationship Status:</strong>{" "}
              {userInfo.relationship_status}
            </p>

            <p>
              <strong>mobile_number:</strong> {userInfo.mobile_number}
            </p>
            <p>
              <strong>place:</strong> {userInfo.place}
            </p>
            <p>
              <strong>summary:</strong> {userInfo.summary}
            </p>
          </div>
        )}

        <div className=" flex justify-center gap-3">
          <button
            onClick={() => {
              setInfo(!openInfo);
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
          >
            View User Info
          </button>
          <button
            onClick={handleComplete}
            className="bg-green-500 text-white px-2 py-1 rounded-md mt-2"
            style={{ display: status === "completed" ? "none" : "block" }}
          >
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorBookedCards;
