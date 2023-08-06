// npm packages
const express = require('express')
const http = require('http');
const {Server} = require('socket.io')
const config = require('../config');
const { login, register } = require('./controllers/auth.controller');
const jwt = require('jsonwebtoken')

// Local modules
const IO = require('./utils/io');
const createGroup = require('./controllers/groupCreate.controller');
const Users = new IO(process.cwd() + '/database/users.json')
const Groups = new IO(process.cwd() + '/database/groups.json')


// Models
// const User = require('./models/User.model')
// const Group = require('./models/Group.model')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
        
    // AUTHENTICATION

    socket.on('auth', async ({username, password}) => {
        const users = await Users.read(); const user = users.find(user => user.username === username)
        if (user) {
            const token = await login(username, password)
            if (token === false) socket.emit('passwordError', {message: "Password is incorrect"})
            else socket.emit('token', {token})
        }
        else {
            socket.emit('register', {message: "you need to register first!"})
        }
    })
    socket.on('registeration', async ({username, password}) => {
        const token = await register(username, password)
        socket.emit('token', {token})
    })

    // CREATE GROUP

    socket.on('isAuth', async ({token, authorname, groupname}) => {
       
    })







})



server.listen(config.port, () => {
    console.log(`listening on ${config.port}`);
})