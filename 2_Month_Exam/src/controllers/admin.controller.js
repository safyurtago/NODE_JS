const bcrypt = require('bcrypt');

const jwt = require('../utils/jwt');
const IO = require('../utils/io')


const Users = new IO(process.cwd() + '/database/users.json')

const register = async (req, res) => {
    const {username, password, adminPass} = req.body
    const users = await Users.read()
    const findUser = users.find(async (user) => (user.username === username) && (await bcrypt.compare(password, user.password)))
    if (adminPass != "12345") return res.status(403).json({message: "Invalid admin password"}) 
    findUser.isAdmin = true
    await Users.write(users)
    const token = jwt.sign(findUser.id)
    res.status(201).json({message: 'Successfully registered as admin', token})
}

const login = async (req, res) => {
    const {username, adminPass} = req.body
    const users = await Users.read()
    const findUser = users.find((user) => user.username === username)
    if (adminPass!= "12345") return res.status(403).json({message: "Invalid admin password"})
    if (!findUser) return res.status(404).json({message: 'User not found'})
    if (!findUser) return res.status(400).json({message: 'You do not have permission to access this'})
    const token = jwt.sign(findUser.id)
    res.status(200).json({message: 'Logged in successfully', token})
}

module.exports = {
    register,
    login
}