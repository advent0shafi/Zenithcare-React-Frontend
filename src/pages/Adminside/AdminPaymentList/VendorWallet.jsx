import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../Interceptor/baseURL";
import PrivateAxios from "../../../Interceptor/AxiosInterceptor";

const VendorWallet = ({ wallet, fetchVendorWalletData }) => {
  const [socket, setSocket] = useState(null);
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    description: "",
  });

  const vendorId = wallet.vendor;
  const roomName = vendorId;

  useEffect(() => {
    if (!socket) {
      const newSocket = new WebSocket(
        `wss://www.zenith-care.online/ws/notfications/${roomName}/`
      );
      newSocket.onopen = () => {
        console.log("WebSocket connection opened");
        setSocket(newSocket);

        // Make the payment request after the WebSocket connection is open
        handlePayment(vendorId);
      };
    }

    return () => {
      if (socket) {
        socket.close();
        console.log("WebSocket closed");
      }
    };
  }, [socket, roomName]);

  const handlePayment = (vendorId) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      PrivateAxios.put(`vendor/pay-amount/${vendorId}/`, paymentData)
        .then((response) => {
          console.log(`Payment successful for vendor ID ${vendorId}`);
          const messageToSend = {
            message_content: `ZenithCare has sent you an amount of  $${paymentData.amount}`,
          };
          socket.send(JSON.stringify(messageToSend));
          fetchVendorWalletData();
        })
        .catch((error) => {
          console.error("Payment error", error);
        });
    } else {
      console.log("WebSocket is not yet open or has closed.");
    }
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
