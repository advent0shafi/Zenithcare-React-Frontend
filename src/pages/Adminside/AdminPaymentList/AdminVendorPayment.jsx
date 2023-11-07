import React, { useEffect, useState } from "react";
import PublicAxios from "../../../Axios/PublicAxios";
import PrivateAxios from "../../../Interceptor/AxiosInterceptor";
import { BASE_URL } from "../../../Interceptor/baseURL";
import VendorWallet from "./VendorWallet";

const AdminVendorPayment = () => {
  const [vendorWallets, setVendorWallets] = useState([]);
  const [socket, setSocket] = useState(null);
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    description: "",
  });

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    fetchVendorWalletData();
  }, []);

  const fetchVendorWalletData = () => {
    PrivateAxios.get("vendor/vendorwallets/", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setVendorWallets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor wallet data", error);
      });
  };

  

  // Function to search vendor wallets based on the search text
  const filteredWallets = vendorWallets.filter((wallet) =>
    wallet.vendor_name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Function to get the current transactions for the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredWallets.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Function to paginate to a different page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Vendor Wallet List</h1>
        <input
          className="mb-4 p-2 border border-blue-300 rounded-md"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <ul className="space-y-4">
          {currentTransactions.map((wallet) => (
            <li
              key={wallet.id}
              className="flex flex-col  bg-white p-4 rounded-lg shadow-md"
            >
              <VendorWallet
                wallet={wallet}
                fetchVendorWalletData={fetchVendorWalletData}
              />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between">
          <div>
            <span>
              Page{" "}
              <strong>
                {currentPage} of{" "}
                {Math.ceil(filteredWallets.length / transactionsPerPage)}
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
                Math.ceil(filteredWallets.length / transactionsPerPage)
              }
              className={`px-3 py-1 rounded-lg ${
                currentPage ===
                Math.ceil(filteredWallets.length / transactionsPerPage)
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
  );
};

export default AdminVendorPayment;
