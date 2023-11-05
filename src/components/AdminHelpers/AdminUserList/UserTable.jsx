import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import { useSelector } from "react-redux";
import PublicAxios from "../../../Axios/PublicAxios";
import AdminVendorView from "../../../pages/Adminside/AdminApproveList/AdminVendorView";
import PrivateAxios from "../../../Interceptor/AxiosInterceptor";

const TABLE_HEAD = ["Member", "Phone", "Active", "actions"];
const ITEMS_PER_PAGE = 5;

const UserTable = ({ isModal, urlEndpoint, Button_Endpoint, IsTherapist }) => {
  const authstate = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [userdata, setUserdata] = useState([]);
  const [size, setSize] = React.useState(null);
  const handleOpen = (value) => setSize(value);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await PrivateAxios.get(`adminside/${urlEndpoint}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserdata(response.data.userlist);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [authstate.accessToken]);

  const [currentPage, setCurrentPage] = useState(1);
  const filteredUsers = userdata.filter(
    (user) =>
      user.id.toString().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const block = async (id) => {
    try {
      const response = await PublicAxios.post(
        `adminside/${Button_Endpoint}/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      const updatedUser = response.data;

      const index = userdata.findIndex((user) => user.id === updatedUser.id);

      if (index !== -1) {
        const updatedUsers = [...userdata];
        updatedUsers[index] = updatedUser;
        setUserdata(updatedUsers);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  return (
    <>
    <div className="px-4 pb-24 h-screen overflow-auto md:px-6">
      <Card className="">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(
                (
                  {
                    id,
                    password,
                    username,
                    email,
                    profile_img,
                    is_active,
                    is_therapist,
                    is_verified,
                    phone_number,
                  },
                  index
                ) => {
                  const isLast = index === userdata.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={username}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {profile_img ? (
                            <Avatar
                              src={`http://127.0.0.1:8000/media/${profile_img}`}
                              alt={username}
                              size="sm"
                            />
                          ) : (
                            <Avatar
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYqXjw6IR_opev4UADLjT8TPcLmWYQsx_YQ&usqp=CAU"
                              alt={username}
                              size="sm"
                            />
                          )}
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {username}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {phone_number}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {is_verified}
                          </Typography>
                        </div>
                      </td>
                      {!isModal ? (
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={is_verified ? "Active" : "InActive"}
                              color={is_verified ? "green" : "blue-gray"}
                            />
                          </div>
                        </td>
                      ) : (
                        <td className={classes}>
                          <div className="w-max">
                            <AdminVendorView user_id={id} />
                          </div>
                        </td>
                      )}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {IsTherapist ? (
                            is_active ? (
                              <button
                                onClick={() => block(id)}
                                className="bg-[#051570] h-8 rounded font-bold text-white w-28"
                              >
                                Block
                              </button>
                            ) : (
                              <button
                                onClick={() => block(id)}
                                className="bg-[#051570] h-8 rounded font-bold text-white w-28"
                              >
                                Unblock
                              </button>
                            )
                          ) : is_therapist ? (
                            <button
                              onClick={() => block(id)}
                              className="bg-[#051570] h-8 rounded font-bold text-white w-28"
                            >
                              Block
                            </button>
                          ) : (
                            <button
                              onClick={() => block(id)}
                              className="bg-[#051570] h-8 rounded font-bold text-white w-28"
                            >
                              Approve
                            </button>
                          )}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1} // Disable if on the first page
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages} // Disable if on the last page
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      </div>
    </>
  );
};

export default UserTable;
