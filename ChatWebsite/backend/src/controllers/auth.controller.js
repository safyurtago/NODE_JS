const bcrypt = require('bcrypt')
const {v4: uuid} = require('uuid')
const jwt = require('jsonwebtoken')

const IO = require('../utils/io')
const Users = new IO(process.cwd() + '/database/users.json')
const config = require('../../config')
// const Groups = new IO(process.cwd() + '/database/groups.json')

const User = require('../models/User.model')
// const Group = require('../models/Group.model')

const login = async (username, password) => {
    const users = await Users.read()
    const user = users.find(u => u.username === username)
    const compare = await bcrypt.compare(password, user.password)
    if (compare === false) return false
    const token = jwt.sign(user.id, config.jwtSecretKey)
    return token
}

const register = async (username, password) => {
    const users = await Users.read()
    const newUser = new User(uuid(), username, await bcrypt.hash(password, 12))
    const data = users.length ? [...users, newUser] : [newUser]
    const token = jwt.sign(newUser.id, config.jwtSecretKey)
    await Users.write(data)
    return token
}

module.exports = {
    login,
    register
}
