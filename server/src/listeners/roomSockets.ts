import { IMessage } from "../models/Message";

export const roomSockets = (io: any, socket: any) => {
    // Join a room
    socket.on('join', (roomName: string) => {
        console.log(`Socket ${socket.id} joining ${roomName}`);
        socket.join(roomName);
    });

    // Leave a room
    socket.on('leave', (roomName: string) => {
        console.log(`Socket ${socket.id} leaving ${roomName}`);
        socket.leave(roomName);
    });

    // Send a message to a room
    socket.on('send', (data: IMessage) => {
        console.log(`Socket ${socket.id} sending message to ${data.room}: ${data.message}`);
        io.to(data.room).emit('receive_message', data);
    });
}