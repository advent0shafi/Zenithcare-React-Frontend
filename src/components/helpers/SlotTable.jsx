import React, { useState, useEffect } from "react";
import { SlotBookingModal } from "./SlotBookingModal";
import axiosInstance from "../../axiosInstance";
import { useSelector } from "react-redux";
import PublicAxios from "../../Axios/PublicAxios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";


const SlotTable = () => {
  const authstate = useSelector((state) => state.auth);
  const user_Id = authstate.user_id;


  const [slots, setSlots] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const slotsPerPage = 5;

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedSlots = slots
    .filter((slot) => slot.date.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

  const pageCount = Math.ceil(sortedSlots.length / slotsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displaySlots = sortedSlots.slice(pageNumber * slotsPerPage, (pageNumber + 1) * slotsPerPage);

  


const handleClick=(id)=>{
  PublicAxios
    .delete(`vendor/delete_slote/${id}`)
    .then((response) => {
      JSON.stringify(response.data);
      console.log("Slot created successfully:", response.status);
      const updatedSloteList = slots.filter((slot) => slot.id !== id);
      setSlots(updatedSloteList);
    
    })
    .catch((error) => {
      console.error("Error creating slot:", error);
    });
}
  useEffect(() => {
    axiosInstance
      .get(`vendor/bookings/${user_Id}/`)
      .then((response) => {
        JSON.stringify(response.data);
        console.log("Slot created successfully:", response.data);
        setSlots(response.data);
      })
      .catch((error) => {
        console.error("Error creating slot:", error);
      });
  }, [user_Id]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Slots</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <SlotBookingModal
            addSlotToList={(slot) => {
              // Ensure user object is defined before adding to the list
              if (slot) {
                console.log("itsn herer");
                setSlots((prevData) => [...prevData, slot]);
              }
            }}
          />
        </button>
        
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300">
  <thead>
    <tr className="bg-gray-100 ">
      <th className="py-3 px-6 border-b text-left">ID</th>
      <th onClick={toggleSortOrder}  className="py-3 px-6 border-b text-left">Slot Date</th>
      <th className="py-3 px-6 border-b text-left">Slot Time</th>
      <th className="py-3 px-6 border-b text-left">Slot Booked</th>
      <th className="py-3 px-6 border-b text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {displaySlots.map((slot) => (
      <tr key={slot.id} className="hover:bg-red-100">
        <td className="py-2 px-6 border-b">{slot.id}</td>
        <td className="py-2 px-6 border-b">{slot.date}</td>
        <td className="py-2 px-6 border-b">{slot.time}</td>
        <td className="py-2 px-6 border-b">{slot.is_available ? "No" : "Yes"}</td>
        <td className="py-2 px-6 border-b">
          <button
            onClick={() => handleClick(slot.id)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

<ReactPaginate
  previousLabel={
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Previous
    </button>
  }
  nextLabel={
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Next
    </button>
  }
  pageCount={pageCount}
  onPageChange={handlePageChange}
  containerClassName={"flex justify-center mt-4"} // Align the pagination in the center
  activeClassName={"active"}
  pageLinkClassName={
    "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mx-2 rounded"
  } // Style for individual page number links
  breakLinkClassName={
    "bg-white text-gray-800 font-semibold py-2 px-4 mx-2 rounded"
  } // Style for break link (...)
/>

    </div>
  );
};

export default SlotTable;
