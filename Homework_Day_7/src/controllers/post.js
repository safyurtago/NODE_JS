const Io = require("../utils/io")
// cwd = Current Work Directory
const Post = require(process.cwd() + "/src/models/Post")
const Posts = new Io(process.cwd() + "/database/posts.json")
const Channels = new Io(process.cwd() + "/database/channels.json")
const getFunction = require(process.cwd() + "/src/utils/get")
const path = require("path")



const createPost = async (req, res) => {
    const {title, description, channel} = req.body
    const photo = req.files?.photo;
    
    const channels = await getFunction(Channels)
    const posts = await getFunction(Posts)

    const findPost = posts.find(post => post.title == title)
    if (findPost) return res.status(400).json({message: "Already exists"})
    
    const mimetype = path.extname(photo.name)       // to find type of file      .png   .jpeg    .mp4    .txt
    const imageName = photo.md5 + "_" + Date.now() + mimetype          // to give unique name
    photo.mv(`${process.cwd()}/uploads/${imageName}`)

    const id = (posts[posts.length - 1]?.id || 0) + 1
    const newPost = new Post(id, imageName, title, description, channel)
    const result = posts.length ? [... posts, newPost] : [newPost]
    await Posts.write(result);
    
    res.status(201).json({message: "CREATED"})
}

const getPosts = async (req, res) => {
    const posts = await getFunction(Posts)
    const channels = await getFunction(Channels)

    const find = posts.map(post => {
        post.channel = channels.filter(channel => channel.id == post.channel)
        return post
    })
    res.status(201).json({posts: find})
}

const getPostById = async (req, res) => {
    const {id} = req.params
    const channels = await getFunction(Channels)
    const posts = await getFunction(Posts)
    const post = posts.find(post => post.id == id)
    post.views += 1
    await Posts.write(posts)
    post.channel = channels.find(channel => channel.id == post.channel)
    res.status(201).json({post})
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
}