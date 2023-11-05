import React, { useEffect, useState } from "react";
import PublicAxios from "../../../Axios/PublicAxios";
import PrivateAxios from "../../../Interceptor/AxiosInterceptor";


const AdminVendorPayment = () => {
  const [vendorWallets, setVendorWallets] = useState([]);
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

  const handlePayment = (vendorId) => {
    // Add your payment handling logic here
    console.log(vendorId);
    PrivateAxios.put(`vendor/pay-amount/${vendorId}/`, paymentData)
      .then((response) => {
        console.log(`Payment successful for vendor ID ${vendorId}`);
        fetchVendorWalletData();
      })
      .catch((error) => {
        console.error("Payment error", error);
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
              className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
                 <div className="flex items-center gap-4">
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={`http://127.0.0.1:8000/media/${wallet.vendor_image}`}
              alt={wallet.vendor_name}
            />
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {wallet.vendor_name}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-lg font-semibold text-gray-900">
              Balance: <span className="text-red-800">${wallet.balance}</span>
            </p>
            <div className="flex gap-4 mt-3">
            <input
                type="text"
                placeholder="Payment Description"
                className="w-full md:w-64 bg-gray-100 rounded-3xl p-2"
                value={paymentData.description}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Enter Amount"
                className="w-full md:w-32 bg-gray-100 rounded-3xl p-2"
                value={paymentData.amount}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, amount: e.target.value })
                }
              />
            
            </div>
            <button
              className="bg-red-500 mt-2 px-4 py-2 rounded-md text-white"
              onClick={() => handlePayment(wallet.vendor)}
            >
              Pay Amount
            </button>
          </div>
   
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between">
  <div>
    <span>
      Page{" "}
      <strong>
        {currentPage} of {Math.ceil(filteredWallets.length / transactionsPerPage)}
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
      disabled={currentPage === Math.ceil(filteredWallets.length / transactionsPerPage)}
      className={`px-3 py-1 rounded-lg ${
        currentPage === Math.ceil(filteredWallets.length / transactionsPerPage)
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
