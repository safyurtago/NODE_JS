const {v4: uuid} = require("uuid")
const path = require("path")

const IO = require(process.cwd() + "/src/utils/io")
const Blogs = new IO(process.cwd() + "/database/blog.json")
const Blog = require(process.cwd() + "/src/models/blog.model")
const getFunction = require(process.cwd() + "/src/utils/get")
const Users = new IO(process.cwd() + "/database/users.json")
const View = require(process.cwd() + "/src/models/view.model")
const Views = new IO(process.cwd() + "/database/views.json")

const blogControlCreate = async (req, res) => {
    try {
        const {title, description} = req.body
        const owner = req.userId
        const photo = req.files?.photo
        const blogs = await getFunction(Blogs)
        const findBlog = blogs.find(blog => blog.title == title)
        if (findBlog) return res.status(400).json({message: "Title already exists"})
        const mimetype = path.extname(photo.name)
        const imageName = photo.md5 + "_" + Date.now() + mimetype
        photo.mv(`${process.cwd()}/uploads/${imageName}`)
        
        const newBlog = new Blog(uuid(), title, description, imageName, owner)
        const result = blogs.length ? [... blogs, newBlog] : [newBlog]
        await Blogs.write(result)
        res.status(201).json({message: "Successfully Created"})

    } catch (error) {
        res.status(501).json({message: "Internal Server Error"})
    }
}

const blogControlGet = async (req, res) => {
    const userId = req.userId
    const {id} = req.params
    const blogs = await getFunction(Blogs)
    const findBlog = blogs.find(blog => blog.id == id)
    if (!findBlog) return res.status(404).json({message: "Blog Not Found"})

    const users = await getFunction(Users)
    const findUser = users.find(user => user.id = id)

    // Views part
    const views = await getFunction(Views)
    const findView = views.find(view => view.userId == userId && view.blogId == findBlog.id)
    
    if (!findView) {
        findBlog.views += 1
        const newView = new View(userId, findBlog.id)
        const data = views.length ? [... views, newView] : [newView]
        await Views.write(data)    
        await Blogs.write(blogs)
    }

    findBlog.owner = findUser
    res.json({findBlog})

}


module.exports = {
    blogControlCreate,
    blogControlGet,
    
}