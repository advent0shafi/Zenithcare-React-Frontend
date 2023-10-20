import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/landingPages/Navbar';
import ConCard from '../../../components/helpers/ConCard';
import Footer from '../../../components/landingPages/Footer';
import HCards from '../../../components/helpers/HCards';
import Buttons from '../../../components/helpers/Buttons';
import Filters from '../../../components/helpers/Filters';
import axiosInstance from '../../../axiosInstance';

const Counselor = () => {
  const [userdata, setUserdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      axiosInstance
        .get(`vendor/topTherapist`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((response) => {
          JSON.stringify(response);
          console.log(response.data.userlist);
          setUserdata(response.data.userlist);
        });
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }, []);

  const filteredUserdata = userdata.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className='bg-white p-4'>
        <div className='rounded p-5'>
          <Filters
            searchQuery={searchQuery}
            onSearchQueryChange={(value) => setSearchQuery(value)}
          />
        </div>

        {filteredUserdata.map((user, index) => (
          <HCards
            key={index}
            name={`Dr ${user.username}`}
            certification='® Certified & Verified'
            specializations={['Top NIMHANS Psychiatrist', 'Specialization 1', 'Specialization 2']}
            buttonText='View Profile'
            id={user.id}
            image={user.profile_img}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Counselor;
