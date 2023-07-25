const Io = require("../utils/io")
// cwd = Current Work Directory
const Channel = require(process.cwd() + "/src/models/Channel")
const Users = new Io(process.cwd() + "/database/users.json")
const Channels = new Io(process.cwd() + "/database/channels.json")
const getFunction = require(process.cwd() + "/src/utils/get")
const path = require("path")


const createChannel = async (req, res) => {
    const {name, username, description, owner} = req.body;
    const photo = req.files?.photo

    const channels = await getFunction(Channels)
    const users = await getFunction(Users)

    const findUserInChannels = channels.find((channel) => channel.username == username)
    const findUser = users.find((user) => user.username == username)

   if (findUser || findUserInChannels) return res.status(400).json({message: "Already exists"})

   const mimetype = path.extname(photo.name)       // to find type of file      .png   .jpeg    .mp4    .txt
   const imageName = photo.md5 + "_" + Date.now() + mimetype          // to give unique name
   photo.mv(`${process.cwd()}/uploads/${imageName}`)

   const id = (channels[channels.length - 1]?.id || 0) + 1

   const newChannel = new Channel(id, name, username, description, imageName, owner)
   const result = channels.length ? [... channels, newChannel] : [newChannel]
   await Channels.write(result)
   res.status(201).json({message: "CREATED"})
}

const getChannels = async (req, res) => {
    const channels = await getFunction(Channels)
    const users = await getFunction(Users)
    const find = channels.map((channel) => {
        channel.owner = users.find((user) => user.id == channel.owner)
        return channel
    })
    res.json({channels: find})
}

const getChannelById = async (req, res) => {
    const {id} = req.params
    const users = await getFunction(Users)
    const channels = await getFunction(Channels)
    const channel = channels.find((channel) => channel.id == id)
    channel.owner = users.find((user) => user.id == channel.owner)
    res.status(201).json({channel})
}

module.exports = {
    createChannel,
    getChannels,
    getChannelById,
}