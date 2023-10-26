import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PublicAxios from "../../../Axios/PublicAxios";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Transaction ID", "Received Amount", "Date", "Time"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
];

const WalletVendor = () => {
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;
  const [walletData, setWalletData] = useState({});
  const [openModal, setopenModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PublicAxios.get(
          `vendor/vendor-wallet/${user_id}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          console.log(response.data);
          setWalletData(response.data);
        } else {
          alert("no data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    PublicAxios.get(`vendor/transactions/${user_id}/`)
      .then((response) => {
        console.log(response.data);
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions by vendor", error);
      });
  }, []);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Handle search
  const filteredTransactions = currentTransactions.filter((transaction) => {
    return (
      transaction.id.toString().includes(searchText) ||
      transaction.amount.includes(searchText) ||
      transaction.description.includes(searchText) ||
      transaction.timestamp.includes(searchText) ||
      transaction.user.toString().includes(searchText)
    );
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <div className="w-full h-40 bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div className="text-2xl font-semibold text-black text-center">
          Wallet Money
        </div>
        <div className="text-4xl font-bold text-black mt-2 text-center">
          ${walletData.balance}
        </div>
        <div className="text-sm text-gray-500 mt-2 text-center">
          You can request money from others by sharing this link.
        </div>
        <button
          onClick={() => setopenModal(!openModal)}
          class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          View Transcations
        </button>
      </div>

      {openModal && (
        <div>
          <div className="p-6">
            <div>
              <input
                className="mb-4 p-2 border border-blue-300 rounded-md"
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map(
                      ({ id, amount, timestamp }, index) => {
                        const timestampDate = new Date(timestamp);
                        const date = timestampDate.toDateString();
                        const time = timestampDate.toLocaleTimeString();

                        return (
                          <tr key={id} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {id}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {amount}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {date}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography
                                as="a"
                                href="#"
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                              >
                                {time}
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </Card>
              <div className="mt-4 flex justify-between">
                <div>
                  <span className="text-xl">
                    Page{" "}
                    <strong>
                      {currentPage} of{" "}
                      {Math.ceil(
                        filteredTransactions.length / transactionsPerPage
                      )}
                    </strong>{" "}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md "
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil(
                        filteredTransactions.length / transactionsPerPage
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletVendor;
