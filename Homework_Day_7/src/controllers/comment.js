const Io = require("../utils/io")
// cwd = Current Work Directory
const Users = new Io(process.cwd() + "/database/users.json")
const Comment = require(process.cwd() + "/src/models/Comment")
const Posts = new Io(process.cwd() + "/database/posts.json")
const Comments = new Io(process.cwd() + "/database/Comments.json")
const getFunction = require(process.cwd() + "/src/utils/get")
const path = require("path")


const createComment = async (req, res) => {
    const {text, author, post} = req.body
    
    const comments = await getFunction(Comments)

    const id = (comments[comments.length - 1]?.id || 0) + 1
    const newComment = new Comment(id, text, author, post)
    const result = comments.length ? [...comments, newComment] : [newComment]
    await Comments.write(result)
    res.status(201).json({message: "CREATED"})
}

const getCommnets = async (req, res) => {
    const users = await getFunction(Users)
    const posts = await getFunction(Posts)
    const comments = await getFunction(Comments)
    const find = comments.map(comment => {
        comment.author = users.find(user => user.id == comment.author)
        comment.post = posts.find(post => post.id == comment.post)
        return comment
    })
    res.json({comments: find})
}

const getCommentById = async (req, res) => {
    const {id} = req.params
    const comments = await getFunction(Comments)
    const posts = await getFunction(Posts)
    const users = await getFunction(Users)
    const findComment = comments.find(comment => comment.id == id)
    findComment.post = posts.find(post => post.id == findComment.post)
    findComment.author = users.find(user => user.id == findComment.author)

    res.status(201).json({findComment})
}

const deleteCommentById = async (req, res) => {
    const {id} = req.params
    const comments = await getFunction(Comments)
    const newComments = comments.filter(comment => comment.id != id)
    await Comments.write(newComments)
    res.status(201).json({message: "DELETED"})
}

module.exports = {
    createComment,
    getCommnets,
    getCommentById,
    deleteCommentById,
}