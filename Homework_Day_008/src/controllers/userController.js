const IO = require(process.cwd() + "/src/utils/io")
const Users = new IO(process.cwd() + "/database/users.json")
const User = require(process.cwd() + "/src/models/User")
const Money = require(process.cwd() + "/src/models/Money")
const getFunction = require(process.cwd() + "/src/utils/get")
const money = new Money()
const bcrypt = require("bcrypt")


const register = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).json({message: "Username and Password are required"})
    const users = await getFunction(Users)
    const findUser = users.find(user => user.username == username)
    if (findUser) return res.status(404).json({message: "Already exists"})
    const id = (users[users.length-1]?.id || 0) + 1
    const newUser = new User(id, username, await bcrypt.hash(password, 12))
    const result = users.length ? [... users, newUser] : [newUser]
    await Users.write(result)
    res.json({message: "CREATED"})

}

const getAll = async (req, res) => {   
    const users = await getFunction(Users)
    res.json({users})
}

const login = async (req, res) => {
    const {username, password} = req.body
    const users = await getFunction(Users)
    const findUsername = users.find(user => user.username == username)
    if (!findUsername) return res.status(404).json({message: "Username Not Found"})
    if (! await bcrypt.compare(password, findUsername.password)) return res.status(400).json({message: "Password is wrong"})
    res.json({message: "Successfully Logged In"})
}

const remove = async (req, res) => {
    const {username, password} = req.body
    const users = await getFunction(Users)
    const findUsername = users.find(user => user.username == username)
    if (!findUsername) return res.status(404).json({message: "Username Not Found"})
    if (! await bcrypt.compare(password, findUsername.password)) return res.status(400).json({message: "Password is wrong"})
    if (findUsername.money) return res.status(400).json({message: "Your account must be empty"})
    const newUsers = users.filter(user => user.username != username)
    await Users.write(newUsers)
    res.json({message: "Deleted"})
}

const transitMoney = async (req, res) => {
    const {user1, user2, amount} = req.body
    if (user1 == user2) return res.status(400).json({message: "Invalid Input"})
    const users = await getFunction(Users)
    const findUser1 = users.find(user => user.id == user1)
    const findUser2 = users.find(user => user.id == user2)
    if (findUser1.money < amount) return res.status(400).json({message: "Not Enough Money"})
    findUser1.money -= +amount
    findUser2.money += +amount
    await Users.write(users)
    res.json({message: "Successfully Transmited"})
}

module.exports = {
    register,
    getAll,
    login, 
    remove, 
    transitMoney,
}