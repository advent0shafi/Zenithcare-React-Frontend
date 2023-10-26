import React, { useEffect, useState } from "react";
import PublicAxios from "../../../Axios/PublicAxios";
import { useSelector } from "react-redux";

const PaymentList = () => {
  const authstate = useSelector((state) => state.auth);
  const user_ID = authstate.user_id;
  const [totalAmount, setTotalAmount] = useState("");
  const [payment, setPayment] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PublicAxios.get(
          `payment/vendor-payments/${user_ID}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setTotalAmount(response.data.total_amount_received);
        setPayment(response.data.payments);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className=" p-5">
        <div className=" p-2 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow">
          <h1 className="font-semibold text-blue-gray-700">
            Total Amount Recieved: ₹{" "}
            <span className="text-red-700 text-xl font-bold">
              {totalAmount}
            </span>
          </h1>
        </div>
      </div>

      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Patiens user
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Slot Time
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody>
              {payment.map((payment, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {payment.payment_id}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {payment.user}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {payment.booked_date}--{payment.booked_slote}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {new Date(payment.payment_date).toLocaleString()}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
