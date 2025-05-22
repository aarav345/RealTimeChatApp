const http = require('http');
const app = require('./app');
const { initSocket } = require('./lib/socket');
const port = process.env.PORT || 5000;

const server = http.createServer(app);
initSocket(server); // initializes socket.io

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
