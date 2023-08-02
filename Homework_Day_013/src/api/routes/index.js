const authRouter = require("./auth.route")
const usersRouter = require("./users.route")
const videosRouter = require("./videos.route")
const videoUploadRouter = require("./videoUpload.route")

module.exports = [
    authRouter,
    usersRouter,
    videosRouter,
    videoUploadRouter
]
