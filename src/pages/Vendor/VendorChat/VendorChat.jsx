import React, { useEffect, useState } from "react";
import image from "../../../assets/logiko.png";
import PublicAxios from "../../../Axios/PublicAxios";
import { useSelector } from "react-redux";
import VendorUserChat from "./VendorUserChat";

const VendorChat = () => {
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;
  const [userdata, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [userID, setUserId] = useState("");
  const [datalength, setDataLength] = useState(0);
  const [openChat, setOpenChat] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PublicAxios.get(`chat/vendor-chat/${user_id}/`);
        console.log("Fetched data:", response.data);
        setUserData(response.data);
        setDataLength(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user_id]);

  const handleSentDataToChatComponets = (id) => {
    console.log("here data", id);
    setSelectedUserId(id);

    setUserId(id);
  };
  return (
    <>
      <div className="bg-white h-96">
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <img className="w-[80px] pl-1" src={image} alt="" />
                </div>
                <div className="ml-2 font-bold text-2xl">UserChat</div>
              </div>

              <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                  <span className="font-bold">User Chated</span>
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    {datalength}
                  </span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                  {userdata.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleSentDataToChatComponets(user.id)}
                      className={`flex flex-row items-center ${
                        selectedUserId === user.id
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      } rounded-xl p-2`}
                    >
                      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`https://www.zenith-care.online${user.profile_img}`}
                          alt="no image"
                        />
                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {user.username}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/*  */}
            <VendorUserChat vendor_id={user_id} user_Id={userID} />

            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorChat;
