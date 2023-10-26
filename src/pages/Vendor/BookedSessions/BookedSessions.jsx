import React, { useEffect, useState } from "react";
import PublicAxios from './../../../Axios/PublicAxios'
import { useSelector } from "react-redux";
import VendorBookedCards from "../../../components/VendorsComponents/VendorBookedCards";

const BookedSessions = () => {
  const authstate = useSelector((state) => state.auth);
  const vendor_ID = authstate.user_id;
  const [booked_sessions, setbooked_sessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PublicAxios.get(
          `booking/booking-vendor-sessions/${vendor_ID}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setbooked_sessions(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-34">
      {booked_sessions.map((booking, index) => (
        <VendorBookedCards key={index} {...booking}/>
     ) )}
    </div>
  );
};

export default BookedSessions;
