const Io = require("../utils/io")
// cwd = Current Work Directory
const User = require(process.cwd() + "/src/models/User")
const Users = new Io(process.cwd() + "/database/users.json")
const Channels = new Io(process.cwd() + "/database/channels.json")
const getFunction = require(process.cwd() + "/src/utils/get")
const path = require("path")


const createUser = async (req, res) => {
   const {fullName, phoneNumber, username, bio} = req.body
   const photo = req.files?.photo;

   const users = await getFunction(Users)
   const channels = await getFunction(Channels)

   const findUserInChannels = channels.find((channel) => channel.username == username)
   const findUser = users.find((user) => user.username == username || user.phoneNumber == phoneNumber)

   if (findUser || findUserInChannels) return res.status(400).json({message: "Already exists"})

   const mimetype = path.extname(photo.name)       // to find type of file      .png   .jpeg    .mp4    .txt
   const imageName = photo.md5 + "_" + Date.now() + mimetype          // to give unique name
   photo.mv(`${process.cwd()}/uploads/${imageName}`)

   const id = (users[users.length - 1]?.id || 0) + 1

   const newUser = new User(id, fullName, phoneNumber, username, bio, imageName)
   const result = users.length ? [... users, newUser] : [newUser]
   await Users.write(result)

   res.status(201).json({message: "CREATED"})

   

}

const getUsers = async (req, res) => {
    const users = await getFunction(Users)
    const channels = await getFunction(Channels)
    const find = users.map(user => {
        user.channels = channels.filter(ch => ch.owner == user.id)
        return user
    })
    res.json({users: find})
}

const getUserById = async (req, res) => {
    const {id} = req.params
    const users = await getFunction(Users)
    const channels = await getFunction(Channels)
    user.channels = channels.filter(ch => ch.owner == user.id)
    const user = users.find((user) => user.id == id)
    res.json({user})
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
}