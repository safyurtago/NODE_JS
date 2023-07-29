const {v4: uuid} = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const config = require(process.cwd() + "/config")
const getFunction = require(process.cwd() + "/src/utils/get")
const IO = require("../utils/io")
const Users = new IO(process.cwd() + "/database/users.json")
const User = require(process.cwd() + "/src/models/user.model")


const userControlRegister = async (req, res) => {
    try {
        const {fullName, username, password} = req.body
        const users = await getFunction(Users)
        const findUser = users.find(user => user.username == username)
        if (findUser) return res.status(403).json({message: "Incorrect Username or Password"})
        const newUser = new User(uuid(), fullName, username, await bcrypt.hash(password, 12))
        const data = users.length ? [... users, newUser] : [newUser]
        const token = jwt.sign({id: newUser.id}, config.secret_key)
        await Users.write(data)
        res.status(201).json({message: "Successfully Registered", token})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

const userControlLogin = async (req, res) => {
    try {
        const {username, password} = req.body
        const users = await getFunction(Users)
        const findUser = users.find(user => user.username == username)
        if (!findUser) return res.status(403).json({message: "Incorrect Username or Password"})
        if (!await bcrypt.compare(password, findUser.password)) return res.status(403).json({message: "Incorrect Username or Password"})
        const token = jwt.sign({id: findUser.id}, config.secret_key, {expiresIn: "24h"})
        res.json({message: "Successfully Logged In", token})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {
    userControlRegister,
    userControlLogin,
    
}