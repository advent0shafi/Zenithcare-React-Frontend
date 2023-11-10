import React, { useState, useEffect } from "react";
import Navbar from "./../../../components/landingPages/Navbar";
import Footer from "./../../../components/landingPages/Footer";
import Filters from "./../../../components/helpers/Filters";
import axiosInstance from "../../../axiosInstance";
import BookedSessionsCards from "./BookedSessionsCards";
import { useSelector, useDispatch } from "react-redux";
import NoData from "../../../components/helpers/NoData";
import ReactPaginate from "react-paginate";

const Booked_sessions = () => {
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;

  const [userdata, setUserdata] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search

  const usersPerPage = 5;

  useEffect(() => {
    try {
      axiosInstance
        .get(`booking/booking-sessions/${user_id}/`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          setUserdata(response.data);
        });
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }, []);

  const pageCount = Math.ceil(userdata.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const filteredData = userdata.filter((data) => {
    return data.therapist_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <div className="bg-white p-4">
        <Filters isFilter={false} onSearchQueryChange={(term) => setSearchTerm(term)} />
        {!filteredData.length && <NoData />}
        {filteredData.slice(pageNumber * usersPerPage, (pageNumber + 1) * usersPerPage).map((data, index) => (
          <BookedSessionsCards
            key={index}
            name={`${data.therapist_name}`}
            sessions={data.mode_of_session}
            date={data.date_of_booking}
            time={data.time}
            buttonText="Message"
            id={data.booking_id}
            user_id={user_id}
            status={data.status}
            vendor_id={data.therapist_id}
            amount={data.therapist_amount}
            image={data.therapist_img}
          />
        ))}
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination flex"}
            activeClassName={"bg-blue-500 text-white"}
            pageClassName="cursor-pointer mx-2 hover:bg-blue-200 py-2 px-4 rounded"
            breakClassName="text-gray-500 mx-2 py-2"
            previousClassName="cursor-pointer mx-2 hover:bg-blue-200 py-2 px-4 rounded"
            nextClassName="cursor-pointer mx-2 hover-bg-blue-200 py-2 px-4 rounded"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booked_sessions;
