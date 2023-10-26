import React, { useEffect, useState } from "react";
import PublicAxios from "../../../Axios/PublicAxios";

const AdminPaymentList = () => {
  const [payments, setPayment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PublicAxios.get(`payment/payment-list`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setPayment(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const filteredPayments = payments.filter((payment) => {
    return (
      payment.payment_id.toString().includes(searchText) ||
      payment.amount.toString().includes(searchText) ||
      payment.user.includes(searchText) ||
      payment.vendor_user.includes(searchText)
    );
  });
  const currentPayments = filteredPayments.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Payment List</h1>
      <input
        className="mb-4 p-2 border border-blue-300 rounded-md"
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow-md">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Payment ID
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Amount
      </th>
     
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Payment Date
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        User
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Therapist
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Booked ID
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Booked Date
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Booked Slot
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {currentPayments.map((payment) => (
      <tr key={payment.payment_id}>
        <td className="px-6 py-4 whitespace-nowrap">
          {payment.payment_id.substring(0, 7)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{payment.amount}</td>
        <td className="px-6 py-4 whitespace-nowrap">{payment.payment_date}</td>
        <td className="px-6 py-4 whitespace-nowrap">{payment.user}</td>
        <td className="px-6 py-4 whitespace-nowrap">{payment.vendor_user}</td>
        <td className="px-6 py-4 whitespace-nowrap">{payment.booked_id}</td>
        <td className="px-6 py-4 whitespace-nowrap">{payment.booked_date}</td>
        <td className="px-6 py-4 whitespace-nowrap">{payment.booked_slote}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <span>
            Page{" "}
            <strong>
              {currentPage} of{" "}
              {Math.ceil(filteredPayments.length / transactionsPerPage)}
            </strong>{" "}
          </span>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredPayments.length / transactionsPerPage)
            }
            className={`px-3 py-1 rounded-lg ${
              currentPage ===
              Math.ceil(filteredPayments.length / transactionsPerPage)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentList;

