let io = null;
const userSocketMap = {};

function initSocket(server) {
    const { Server } = require('socket.io');
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);

        const userId = socket.handshake.query.userId;
        if (userId) userSocketMap[userId] = socket.id;

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });

    return io;
}

function getReceiverSocketId(userID) {
    return userSocketMap[userID];
}

function getIO() {
    return io;
}

module.exports = {
    initSocket,
    getReceiverSocketId,
    getIO,
};
