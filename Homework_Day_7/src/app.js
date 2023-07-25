require("dotenv").config()
const express = require("express")
const fileUpload = require("express-fileupload")

const {createUser, getUsers, getUserById} = require("./controllers/user")
const {createChannel, getChannels, getChannelById} = require("./controllers/channel")
const {createPost, getPosts, getPostById} = require("./controllers/post")
const {createComment, getCommnets, getCommentById, deleteCommentById} = require("./controllers/comment")


const {PORT} = process.env;
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use("/uploads", express.static(process.cwd() + "/uploads")) //  to give browser permission to use



// USER                 // "/user" ->  router       ||      ()=>{} -> controller 
app.post("/user", createUser)                    
app.get("/users", getUsers)
app.get("/user/:id", getUserById)

// CHANNEL
app.post("/channel", createChannel)
app.get("/channels", getChannels)
app.get("/channel/:id", getChannelById)

// POST
app.post("/post", createPost)
app.get("/posts", getPosts)
app.get("/post/:id", getPostById)

// COMMENT
app.post("/comment", createComment)
app.get("/comments", getCommnets)
app.get("/comment/:id", getCommentById)
app.delete("/comment/:id", deleteCommentById)



app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})