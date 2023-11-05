import React, { useEffect, useState } from "react";
import PublicAxios from "../../../Axios/PublicAxios";
import PrivateAxios from "../../../Interceptor/AxiosInterceptor";
const AdminPaymentList = () => {
  const [payments, setPayment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PrivateAxios.get(`payment/payment-list`, {
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
    <div className="px-4 pb-24 h-screen overflow-scroll md:px-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Payment List</h1>
      <input
        className="mb-4 p-2 border border-blue-300 rounded-md"
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="w-full ">
        <div className="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
          <div className="text-center">
            <h4 className="text-gray-700 font-semibold text-lg">
              Past 5 Payments{" "}
            </h4>
          </div>
          <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-100 text-gray-600 border-b">
                    Payment ID
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-gray-600 border-b">
                    Amount
                  </th>

                  <th className="px-4 py-2 bg-gray-100 text-gray-600 border-b">
                    Payment Date
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-gray-600 border-b">
                    User
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-gray-600 border-b">
                    Booked ID
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-gray-600 border-b">
                    Booked Date
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-gray-600 border-b">
                    Booked Slot
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-gray-600 border-b">
                    Vendor User
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {currentPayments.map((payment, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 border">
                      <span className="text-sm">{payment.payment_id}</span>
                    </td>
                    <td className="px-4 py-3 border">
                      <span className="text-sm">${payment.amount}</span>
                    </td>

                    <td className="px-4 py-3 border">
                      <span className="text-sm">
                        {new Date(payment.payment_date).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 border">
                      <span className="text-sm">{payment.user}</span>
                    </td>
                    <td className="px-4 py-3 border">
                      <span className="text-sm">{payment.booked_id}</span>
                    </td>
                    <td className="px-4 py-3 border">
                      <span className="text-sm">
                        {new Date(payment.booked_date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 border">
                      <span className="text-sm">{payment.booked_slote}</span>
                    </td>
                    <td className="px-4 py-3 border">
                      <span className="text-sm">{payment.vendor_user}</span>
                    </td>
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
      </div>
    </div>
  );
};

export default AdminPaymentList;
