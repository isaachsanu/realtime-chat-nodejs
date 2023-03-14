import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./styles.css";

const socket = io("http://localhost:8000");

function App() {
  const [room, setRoom] = useState('1');
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

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        sender: socketID,
        message: currentMessage,
      };

      await socket.emit("send", {room: room, message: messageData});
      setCurrentMessage("");
    }
  };

  const handleJoinRoom = () => {
    socket.emit('join', room);
  };

  const handleLeaveRoom = () => {
    socket.emit('leave', room);
  };

  return (
    <div class="container">
      <h1>Realtime Chat</h1>

      <div class="msg-container-wrapper">
        <div class="message-container">
          {messageList.map((msg) => {
            return (
              <div
                class={`message ${msg.sender === socketID ? "my-msg" : "other-msg"
                  }`}
              >
                {msg.message}
              </div>
            );
          })}
        </div>
      </div>

      <div class="input-container">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={() => sendMessage(currentMessage)}>Send</button>
      </div>
      <div class="input-container">
        <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} />
        <button onClick={handleJoinRoom}>Join Room</button>
        <button onClick={handleLeaveRoom}>Leave Room</button>
      </div>
    </div>
  );
}

export default App;
