const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

// LOCAL MODULES
const IO = require('./utils/io');
const User = require('./models/User')
const Group = require('./models/Group')

const Users = new IO(process.cwd() + '/database/users.json')
const Groups = new IO(process.cwd() + '/database/groups.json')

const app = express();


const createUser = async (username, groupname) => {
    const users = await Users.read()
    const id = (users[users.length - 1]?.id || 0) + 1
    const newUser = new User(id, username)
    newUser.userGroups.push(groupname)
    const result = users.length ? [...users, newUser] : [newUser]
    await Users.write(result)
}

const createGroup = async (name, author) => {
    const groups = await Groups.read()
    const id = (groups[groups.length - 1]?.id || 0) + 1
    const newGroup = new Group(id, name, author)
    newGroup.groupUsers.push(author)
    const result = groups.length? [...groups, newGroup] : [newGroup]
    await Groups.write(result)
    return groups
}

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', async (socket) => {
    let users = await Users.read()
    let groups = await Groups.read()
    let info = await Groups.read()
    io.on('disconnect', () => {})

    // CREATE SECTION

    socket.on('createGroup', async (data) => {
        const findAuthor = users.find(user => user.username === data.authorName);
        if (!findAuthor) {
            createUser(data.authorName, data.groupName)
            const findGroup = groups.find(group => group.name === data.groupName);
            if (!findGroup) {
                await createGroup(data.groupName, data.authorName)
                socket.join(data.groupName)
                socket.to('sfr').emit('new-message', {message: `${data.authorName} joined to the group ${data.groupName}`})
            }
            info = await Groups.read()
            io.emit('groups', {info})
        }
        else {
            const findGroup = groups.find(group => group.name === data.groupName);
            if (!findGroup) {
                await createGroup(data.groupName, data.authorName)
                socket.join(data.groupName)    
                socket.to('sfr').emit('new-message', {message: `${data.authorName} joined to the group ${data.groupName}`})
            }
            info = await Groups.read()
            io.emit('groups', {info})
        }
    })


    io.emit('groups', {info})
} )

server.listen(5555, () => {
    console.log(5555);
});