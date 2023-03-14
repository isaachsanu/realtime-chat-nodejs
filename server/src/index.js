const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // executed once a user registered to a socket
  io.to(socket.id).emit("socket_id", socket.id);

  // Join a room
  socket.on('join', (roomName) => {
    console.log(`Socket ${socket.id} joining ${roomName}`);
    socket.join(roomName);
  });

  // Leave a room
  socket.on('leave', (roomName) => {
    console.log(`Socket ${socket.id} leaving ${roomName}`);
    socket.leave(roomName);
  });

  // Send a message to a room
  socket.on('send', (data) => {
    console.log(`Socket ${socket.id} sending message to ${data.room}: ${data.message}`);
    io.to(data.room).emit('receive_message', data.message);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // socket.on("send_message", (messageData) => {
  //   console.log(messageData);
  //   socket.broadcast.emit("receive_message", messageData);
  // });
});

server.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
