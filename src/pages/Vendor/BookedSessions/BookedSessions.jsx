import React, { useEffect, useState } from "react";
import PublicAxios from "./../../../Axios/PublicAxios";
import { useSelector } from "react-redux";
import VendorBookedCards from "../../../components/VendorsComponents/VendorBookedCards";

const BookedSessions = () => {
  const authstate = useSelector((state) => state.auth);
  const vendor_ID = authstate.user_id;
  const [bookedSessions, setBookedSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [sessionsPerPage] = useState(2); // Number of sessions per page
  const [searchTerm, setSearchTerm] = useState(""); // Search term

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

        setBookedSessions(response.data);
        setFilteredSessions(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [vendor_ID]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = bookedSessions.filter((session) =>
      session.user_name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSessions(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Calculate the index of the last session on the current page
  const indexOfLastSession = currentPage * sessionsPerPage;
  // Calculate the index of the first session on the current page
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  // Get the sessions for the current page
  const currentSessions = filteredSessions.slice(
    indexOfFirstSession,
    indexOfLastSession
  );

  return (
    <div className="mt-34">
      {bookedSessions.length != 0 && (
        <input
          type="text"
          placeholder="Search sessions"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md p-2 text-base outline-none focus:border-blue-500"
        />
      )}

      {bookedSessions.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-bold text-gray-600">
            No sessions History
          </p>
        </div>
      ) : (
        currentSessions.map((booking, index) => (
          <VendorBookedCards key={index} {...booking} />
        ))
      )}

      {/* Pagination */}
      {bookedSessions.length != 0 && (
        <div className="pagination flex gap-3 justify-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded-l`}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastSession >= filteredSessions.length}
          className={`${
            indexOfLastSession >= filteredSessions.length
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded-r`}
        >
          Next
        </button>
      </div>
      
      )}
    </div>
  );
};

export default BookedSessions;
