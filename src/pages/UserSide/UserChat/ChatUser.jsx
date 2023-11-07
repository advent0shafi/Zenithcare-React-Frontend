import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import PublicAxios from "../../../Axios/PublicAxios";
import { BASE_URL } from "../../../Interceptor/baseURL";


const ChatUser = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get("user_id");
  const vendor_id = searchParams.get("vendor_id");
const image =  searchParams.get("image");
const name =  searchParams.get("name");

  const [messages, setMessages] = useState([]);
  const [userId, setUser] = useState(user_id);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [websocketMessages, setWebsocketMessages] = useState([]);

  useEffect(() => {
    const roomName = `${vendor_id}_${userId}`;
    console.log("room name----", roomName);
    const newSocket = new WebSocket(`wss://www.zenith-care.online/ws/chat/${roomName}/`);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      socket.onmessage = (event) => {
        console.log("messaage recived");
        const data = JSON.parse(event.data);
        const message_get = data.message_content;
        setWebsocketMessages((prevMessages) => [...prevMessages, data]);
      };
    }

    const sendMessage = () => {
      const messageToSend = {
        message_content: messageInput,
      };
      socket.send(JSON.stringify(messageToSend));
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
      sendMessage();
    }
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PublicAxios.get(
          `/chat/chat/${userId}/${vendor_id}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;

    try {
      const newMessage = {
        sender: userId,
        receiver: vendor_id,
        message_content: messageInput,
      };
      const response = await PublicAxios.post("/chat/create/", newMessage, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        if (socket) {
          socket.send(JSON.stringify(newMessage));
        }
        setMessageInput("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    setMessages((prevMessages) => [...prevMessages, ...websocketMessages]);
  }, [websocketMessages]);
  return (
    <>
      <div className="flex md:h-[500px]  antialiased text-gray-800">
        <div className="flex flex-row h-full w-full  overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-6">
          

          <div className="flex flex-col flex-auto flex-shrink-0 bg-gray-100 h-full p-4 rounded-2xl rounded-tr-2xl rounded-tl-2xl">
          <div className="bg-white p-1 rounded-xl  flex justify-between">
            <div className="flex gap-3">
              <img src={`${BASE_URL}media/${image}`}  alt=""  className="h-12 w-12 rounded-full bg-gray-50"/>
              <div> <p className="text-base font-semibold">{name}</p>
              <p className="text-xs">active recently</p>
              </div>
            </div>
          </div>
              <div className="flex flex-col  h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {messages.map((message, index) => (
                      <div
                        onClick={() => {
                          console.log(
                            "Condition evaluation:",
                            message.sender != vendor_id
                          );
                        }}
                        key={index}
                        className={
                          message.sender != userId
                            ? "col-start-1 col-end-8 p-3 rounded-lg"
                            : "col-start-6 col-end-13 p-3 rounded-lg"
                        }
                      >
                        <div
                          key={index}
                          className={
                            message.sender != userId
                              ? "flex flex-row items-center"
                              : "flex items-center justify-start flex-row-reverse"
                          }
                        >
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {message.sender != vendor_id ? (
                              <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
                            </svg>
                            
                            
                            </div>
                            ) : (
                              <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                            </svg>
                            </div>
                            )}
                          </div>
                          <div
                            className={`relative mr-3 text-sm py-2 px-4 shadow rounded-xl ${
                              message.sender != userId
                                ? "  bg-indigo-100"
                                : " bg-white"
                            }`}
                          >
                            <div> {message.message_content}</div>
                            <div className="absolute text-xs bottom-0 left-0 -mb-5 mr-2 text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={handleSendMessage}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUser;
