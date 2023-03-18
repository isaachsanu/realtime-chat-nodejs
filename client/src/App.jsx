import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import RoomCheckbox from "./components/RoomCheckbox";
import "./index.css";
import { useChat } from "./stores/chat";
import { useRoom } from "./stores/room";
import "./styles.css";

const socket = io("http://localhost:8000");

function App() {
  const [room, dispatchRoom] = useRoom();
  const [chat, dispatchChat] = useChat();

  const [socketID, setSocketID] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    room.available.forEach((item, idx) => {
      socket.emit('join', item.id);
      dispatchChat({ type: "INIT_CHAT_ROOM", payload: item.id });
    });
  }, []);

  useEffect(() => {
    socket.on("socket_id", (id) => {
      setSocketID(id);
    });

    socket.on("receive_message", (data) => {
      console.log("tesfff");
      dispatchChat({ type: "RECEIVE_MESSAGE", payload: data });
    });

    return () => {
      socket.off("socket_id");
      socket.off("receive_message");
    };
  }, [socket]);

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
          {
            room.available.map((item, idx) => {
              return <RoomCheckbox id={item.id} name={item.name} />;
            })
          }
        </div>
        <div className="basis-3/4 flex flex-col bg-blue-200 p-4 min-h-[480px]">
          {room.current == "" &&
            <div className="grow flex flex-col items-center">
              <div className="grow flex flex-row items-center">
                <div>Select room to start chatting</div>
              </div>
            </div>
          }
          {room.current != "" &&
            <>
              <div className="grow flex flex-col-reverse">
                <div>
                  <div>&nbsp;</div>
                  {room.current != "" && chat.chatByRoom[room.current].map((msg) => {
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
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
