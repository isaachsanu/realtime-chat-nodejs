export const initSockets = (io: any, socket: any) => {
    // executed once a user registered to a socket
    io.to(socket.id).emit("socket_id", socket.id);

    // Disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
}
