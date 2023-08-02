const {Router} = require("express")
const isAuth = require("../middlewares/isAuth.middleware")
const path = require("path")
const {v4: uuid} = require("uuid")

const IO = require("../../utils/io")
const Videos = new IO(process.cwd() + "/database/videos.json")
const Video = require("../../models/Video.model")


const router = Router()


router.post('/videoUpload', isAuth, async (req, res) => {
    const {description} = req.body
    const {video} = req.files
    const videos = await Videos.read()
    const user_id = req.user.id
    const id = (videos[videos.length - 1]?.id || 0) + 1
    const vidoeName = uuid() + path.extname(video.name)
    video.mv(process.cwd() + `/uploads/${vidoeName}`)
    const newVideo = new Video({
        id,
        description,
        user_id,
        vidoeName
    })
    const data = videos.length ? [... videos, newVideo] : [newVideo]
    await Videos.write(data)
    res.status(201).json({message: "Success"})

})

router.get('/videoUpload', (req, res) => {
    res.render('videoUpload')
})

module.exports = router