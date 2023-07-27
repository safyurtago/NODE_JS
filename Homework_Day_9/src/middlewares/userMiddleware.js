const IO = require(process.cwd() + "/src/utils/io")
const User = require(process.cwd() + "/src/models/User")
const Users = new IO(process.cwd() + "/database/users.json")
const bcrypt = require("bcrypt")

const userMiddlewareRegister = async (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({message: "Username and Password are required"})
    const users = await Users.read()
    const findUser = users.find(user => user.username == username)
    if (findUser) return res.status(400).json({message: "Username has already exists"})
    next()
}

const userMiddlewareLogin = async (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({message: "Username and Password are required"})
    const users = await Users.read()
    const findUser = users.find(user => user.username == username && bcrypt.compare(password, user.password))
    if (!findUser) return res.status(400).json({message: "Username or Password is wrong"})
    req.id = findUser.id
    next()
}

const userMiddlewareTransit = async (req, res, next) => {
    req.id = req.headers.id
    next()
}

const userMiddlewareDelete = async (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({message: "Username and Password are required"})
    const users = await Users.read()
    const findUser = users.find(user => user.username == username && bcrypt.compare(password, user.password))
    if (!findUser) return res.status(400).json({message: "Username or Password is wrong"})
    req.findUser = findUser; req.users = users
    next()
}

module.exports = {
    userMiddlewareRegister,
    userMiddlewareLogin,
    userMiddlewareTransit,
    userMiddlewareDelete,
}