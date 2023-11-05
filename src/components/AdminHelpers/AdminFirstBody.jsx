import React, { useEffect, useState } from "react";
import PublicAxios from "../../Axios/PublicAxios";
import Loading from "../Spinner/Loading";
import PrivateAxios from "../../Interceptor/AxiosInterceptor";

const AdminFirstBody = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PrivateAxios.get("adminside/payment-statistics/")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center w-full my-6 space-y-4 md:space-x-4 md:space-y-0 md:flex-row">
        <div className="w-full md:w-6/12">
          <div className="relative w-full overflow-hidden bg-white shadow-lg dark:bg-gray-700">
            <a href="#" className="block w-full h-full">
              <div className="flex items-center justify-between px-4 py-6 space-x-4">
                <div className="flex items-center">
                  <span className="relative p-5 bg-yellow-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <p className="ml-2 text-sm font-semibold text-gray-700 border-b border-gray-200 dark:text-white">
                    Total Amount Received
                  </p>
                </div>
                <div className="mt-6 text-xl font-bold text-black border-b border-gray-200 md:mt-0 dark:text-white">
                  ${data.total_amount_received}
                </div>
              </div>
              <div className="w-full h-3 bg-gray-100">
                <div className="h-full text-xs text-center text-white bg-gray-400"></div>
              </div>
            </a>
          </div>
        </div>
        <div className="flex items-center w-full space-x-4 md:w-1/2">
          <div className="w-1/2">
            <div className="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
              <p className="text-2xl font-bold text-black dark:text-white">
                {data.total_payment_count}
              </p>
              <p className="text-sm text-gray-400">Total Payment done</p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
              <p className="text-2xl font-bold text-black dark:text-white">
                ${data.ten_percent_profits}
              </p>
              <p className="text-sm text-gray-400">Total Profite </p>
              <span className="absolute p-4 bg-gray-300 rounded-full top-2 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFirstBody;
