const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: "*"
    }
});

io.on("connection", (socket) => {
    
})




server.listen(8080, () => {
    console.log('listening on *:8080');
});