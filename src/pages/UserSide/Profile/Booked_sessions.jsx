import React, { useState, useEffect } from 'react';
import Navbar from './../../../components/landingPages/Navbar';
import Footer from './../../../components/landingPages/Footer';
import Filters from './../../../components/helpers/Filters';
import axiosInstance from '../../../axiosInstance';
import BookedSessionsCards from '../../../components/helpers/BookedSessionsCards';
import { useSelector, useDispatch } from "react-redux";


const Booked_sessions = () => {
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;

  const [userdata, setUserdata] = useState([]);


  useEffect(() => {
    try {
      axiosInstance
        .get(`booking/booking-sessions/${user_id}/`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((response) => {
          JSON.stringify(response);
          console.log(response.data);
          setUserdata(response.data);
        });
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }, []);

 

  return (
    <div>
      <Navbar />
      <div className='bg-white p-4'>
        {userdata.map((data, index) => (
          <BookedSessionsCards
            key={index}
            name={`Dr ${data.therapist_name}`}
            sessions={data.mode_of_session}
            date = {data.date_of_booking}
            time={data.time}
            buttonText='Message'
            id={data.id}
            user_id={user_id}
            vendor_id={data.therapist_id}
            amount = {data.therapist_amount}
            image={data.therapist_img}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Booked_sessions;
