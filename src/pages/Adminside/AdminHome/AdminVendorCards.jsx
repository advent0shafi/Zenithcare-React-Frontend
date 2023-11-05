import React from "react";

const AdminVendorCards = ({ payment }) => {
  return (
    <>
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
                {Array.isArray(payment) &&
                  payment.map((payment, index) => (
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
        </div>
      </div>
    </>
  );
};

export default AdminVendorCards;
