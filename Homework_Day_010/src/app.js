const express = require("express")
const config = require(process.cwd() + "/config")
const fileUpload = require("express-fileupload")

const authRouter = require(process.cwd() + "/src/routes/auth.router")
const blogRouter = require(process.cwd() + "/src/routes/blog.router")
const userRouter = require(process.cwd() + "/src/routes/users.router")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())


app.use("/api", authRouter)
app.use("/api", blogRouter)
app.use("/api", userRouter)

app.listen(config.port, () => {
    console.log(config.port);
});