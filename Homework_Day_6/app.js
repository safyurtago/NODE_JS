const express = require("express");
const IO = require("./utils/io")
const Blog = require("./models/blog")

const BLOGS = new IO("./database/blogs.json")

const app = express()
app.use(express.json())

app.post("/blog", async (req, res) => {
    const {title, description} = req.body

    if (!title || !description) return res.status(400).json({message: "Title and Description is required"})

    const blogs = await BLOGS.read()
    
    const id = (blogs[blogs.length - 1]?.id || 0) + 1

    const newBlog = new Blog(id, title, description)
    const data = blogs.length ? [... blogs, newBlog] : [newBlog]
    await BLOGS.write(data)
    res.status(201).json({message: "Successfully Created"})
})

app.get("/blogs", async (req, res) => {
    const blogs = await BLOGS.read()
    res.json(blogs)
})

app.put("/blog/:id", async (req, res) => {
    const id = req.params
    const {title, description} = req.body
    const blogs = await BLOGS.read()
    const findBlog = blogs.find((blog) => blog.id == id)
    if (!findBlog) return res.status(404).json({message: "BlOG NOT FOUND"})

    findBlog.title = title ? title : findBlog.title
    findBlog.description = description ? description : findBlog.description
    await BLOGS.write(blogs)
})


app.listen(4000, () => {
    console.log("Server listening on port: 4000");
})