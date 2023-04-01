import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import mongoose from 'mongoose';

import routes from './routes';
import errorHandler from './handlers/errorHandler';
import socketListeners from "./listeners";

dotenv.config();
const port = process.env.PORT;

const mongooseOptions: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoUrl = 'mongodb+srv://eeza:7bnr4p3ExPo7yRhG@cluster0.kyx7cnb.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUrl, mongooseOptions).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

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
