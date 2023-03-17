import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import RoomCheckbox from "./components/RoomCheckbox";
import "./index.css";
import { useRoom } from "./stores/room";
import "./styles.css";

const socket = io("http://localhost:8000");

function App() {
  const [room, dispatch] = useRoom();
  const [socketID, setSocketID] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("socket_id", (id) => {
      setSocketID(id);
    });

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("socket_id");
      socket.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit('join', room.current);
    socket.emit('leave', room.previous);
  }, [room]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        senderId: socketID,
        message: currentMessage,
        messageType: "text",
        room: room.current,
      };

      await socket.emit("send", messageData);
      setCurrentMessage("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row border-2 border-blue-200 rounded-xl">
        <div className="basis-1/4 flex flex-col">
          <RoomCheckbox roomId="123" isActive={false} />
          <RoomCheckbox roomId="234" isActive={false} />
        </div>
        <div className="basis-3/4 flex flex-col bg-blue-200 p-4 min-h-[50vh]">
          <div className="grow flex flex-col-reverse">
            <div>
              <div>&nbsp;</div>
              {messageList.map((msg) => {
                return (
                  <div
                    className={`message ${msg.senderId === socketID ? "my-msg" : "other-msg"
                      }`}
                  >
                    {msg.message}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-none">
            <div className="input-container">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <button onClick={() => sendMessage(currentMessage)}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
