const http = require('http');
const Server = require('socket.io').Server;
const app = require('./app');
const port = process.env.PORT || 5000;  

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
    })
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})