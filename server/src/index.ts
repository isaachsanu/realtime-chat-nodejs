import express from "express";
import dotenv from 'dotenv';

import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import socketListeners from "./listeners";

dotenv.config();
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);

app.use(cors());

/* socket.io sections */
 
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socketListeners(io, socket);
});

/* socket.io sections */

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
