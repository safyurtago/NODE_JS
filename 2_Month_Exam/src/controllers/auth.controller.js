const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

const IO = require('../utils/io')
const User = require('../models/User.model')

const Users = new IO(process.cwd() + '/database/users.json')

const register = async (req, res) => {
    const {firstName, lastName, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await Users.read()
    if (users.find(user => user.username === username)) {
        return res.status(400).json({message: 'Username already taken'})
    }
    const newUser = new User(firstName, lastName, username, email, hashedPassword)
    const result = users.length ? [...users, newUser] : [newUser]
    await Users.write(result)
    const token = jwt.sign(newUser.id)
    return res.status(201).json({message: 'User created', token})
}

const login = async (req, res) => {
    const {username, password} = req.body
    const users = await Users.read()
    const user = users.find(user => user.username === username)
    if (!user) {
        return res.status(400).json({message: 'Username not found'})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(400).json({message: 'Invalid password'})
    }
    const token = jwt.sign(user.id)
    return res.status(200).json({message: 'User logged in', token})
}

module.exports = {
    register,
    login
}