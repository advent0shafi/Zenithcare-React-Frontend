import React, { useEffect, useState } from "react";
import PublicAxios from "../../../Axios/PublicAxios";
import { useSelector } from "react-redux";

const VendorUserChat = ({ vendor_id, user_Id }) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUser] = useState(user_Id);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [websocketMessages, setWebsocketMessages] = useState([]);

  useEffect(() => {
    const roomName = `${vendor_id}_${user_Id}`;
    console.log("room name----", roomName);
    const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [user_Id]);

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
          `/chat/chat/${vendor_id}/${user_Id}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setMessages(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user_Id]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;

    try {
      const newMessage = {
        sender: vendor_id,
        receiver: user_Id,
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
      <div className="flex flex-col flex-auto h-full p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                {messages.map((message, index) => (
                  <div
                    onClick={() => {
                      console.log(
                        "Condition evaluation:",
                        message.sender == user_Id
                      );
                    }}
                    key={index}
                    className={
                      message.sender == user_Id
                        ? "col-start-1 col-end-8 p-3 rounded-lg"
                        : "col-start-6 col-end-13 p-3 rounded-lg"
                    }
                  >
                    <div
                      key={index}
                      className={
                        message.sender == user_Id
                          ? "flex flex-row items-center"
                          : "flex items-center justify-start flex-row-reverse"
                      }
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        A
                      </div>
                      <div
                        className={`relative mr-3 text-sm py-2 px-4 shadow rounded-xl ${
                          message.sender === user_Id
                            ? "  bg-indigo-100"
                            : " bg-white"
                        }`}
                      >
                        <div> {message.message_content}</div>
                        <div className="absolute text-xs bottom-0 left-0 -mb-5 mr-2 text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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
    </>
  );
};

export default VendorUserChat;
