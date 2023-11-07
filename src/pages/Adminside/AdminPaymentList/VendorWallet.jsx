import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../Interceptor/baseURL";
import PrivateAxios from "../../../Interceptor/AxiosInterceptor";

const VendorWallet = ({ wallet,fetchVendorWalletData }) => {
  const [socket, setSocket] = useState(null);
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    description: "",
  });
  
  const vendorId=wallet.vendor
  console.log(vendorId)
  const roomName = `${vendorId}_${"admin"}`;
  console.log("room name", roomName)

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(`ws://127.0.0.1:8000//ws/note-chat/${roomName}/`);
      newSocket.onopen = () => {
        console.log('WebSocket connection opened');
        setSocket(newSocket);
      };
    }

    return () => {
      // Close the WebSocket connection when the component unmounts
      if (socket) {
        socket.close();
      }
    };
  }, [socket, roomName]);


  const handlePayment = (vendorId) => {
  
    PrivateAxios.put(`vendor/pay-amount/${vendorId}/`, paymentData)
      .then((response) => {
        console.log(`Payment successful for vendor ID ${vendorId}`);
      
        fetchVendorWalletData();
      })
      .catch((error) => {
        console.error("Payment error", error);
      });
  };
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={`${BASE_URL}media/${wallet.vendor_image}`}
          alt=""
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
    </div>
  );
};

export default VendorWallet;
