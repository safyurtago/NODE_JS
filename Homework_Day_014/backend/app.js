const express = require('express')
const http  = require('http')
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
let users = []
io.on('connection', socket => { 
    users.push({id: socket.id, name: "test " + users.length})
    const curUser = users.find(user => user.id === socket.id)

    socket.on("message", (data) =>{
        socket.broadcast.emit('response', {message: data.message, name: curUser.name});
    })

    socket.emit('name', curUser.name)

    socket.on("disconnect", (data) =>{
        users = users.filter(user => user.id!== socket.id)
        // console.log("connection disconnected");
    })
})

server.listen(5555, () => {
    console.log("PORT : 5555")
})