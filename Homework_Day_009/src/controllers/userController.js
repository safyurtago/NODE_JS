const IO = require(process.cwd() + "/src/utils/io")
const User = require(process.cwd() + "/src/models/User")
const {v4: uuid} = require("uuid")
const bcrypt = require("bcrypt")

const Users = new IO(process.cwd() + "/database/users.json")

const userControlRegister = async (req, res) => {
    const {username, password} = req.body
    const users = await Users.read()
    const findUser = users.find(user => user.username == username)
    const newUser = new User(uuid(), username, await bcrypt.hash(password, 12))
    const result = users.length ? [... users, newUser] : [newUser]
    await Users.write(result)
    res.json({message: "Created"})
}

const userControlLogin = async (req, res) => {
    res.status(200).json({id: req.id})
}

const userControlTransit = async (req, res) => {
    const {toUser, money} = req.body
    const users = await Users.read()
    const sender = users.find(user => user.id == req.id)
    if (sender.money < money) return res.status(400).json({message: "Sender has no enough money"})
    const receiver = users.find(user => user.username == toUser)
    sender.money -= +money
    receiver.money += +money
    await Users.write(users)
    res.json({message: "Transmission occured Successfully"})
}

const userControlDelete = async (req, res) => {
    if (req.findUser.money != 0) return res.status(400).json({message: "User's account must be empty"})
    const newUsers = req.users.filter(user => user != req.findUser)
    await Users.write(newUsers)
    res.json({message: "Succesfully Deleted"})
}

module.exports = {
    userControlRegister,
    userControlLogin,
    userControlTransit,
    userControlDelete,
}