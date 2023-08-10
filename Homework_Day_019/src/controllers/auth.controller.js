const IO = require('../utils/io')
const User = require('../models/User.model')
const {v4: uuid} = require('uuid')
const path = require('path')
const jwt = require('../utils/jwt')

const Users = new IO(process.cwd() + '/database/users.js')

const register = async (req, res) => {
    const {firstName, lastName, username, password, age} = req.body
    const file = req.files.photo
    const users = await Users.read()
    const user = users.find(u => u.username === username)
    if (user) {
        return res.status(400).json({message: 'Username already taken'})
    }
    if (!file) {
        return res.status(400).json({message: 'No photo selected'})
    }
    const photoName = uuid() + path.extname(file.name)
    file.mv(process.cwd() + '/uploads/' + photoName)
    const newUser = new User(firstName, lastName, username, password, photoName, age)
    const result = users.length ? [...users, newUser] : [newUser]
    await Users.write(result)
    const token = jwt.sign({token: newUser.id})
    return res.status(201).json({message: 'User created', token})
}

const login = async (req, res) => {
    const {username, password} = req.body
    const users = await Users.read()
    const user = users.find(u => u.username === username)
    if (!user) {
        return res.status(400).json({message: 'Username not found'})
    }
    if (user.password!== password) {
        return res.status(400).json({message: 'Password incorrect'})
    }
    const token = jwt.sign({token: user.id})
    return res.status(200).json({message: 'User logged in', token})
}

module.exports = {
    register,
    login
}