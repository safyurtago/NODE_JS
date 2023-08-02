const {Router} = require("express")


const IO = require("../../utils/io")

const Videos = new IO(process.cwd() + "/database/videos.json")


const router = Router()

router.get('/videos/:id', async (req, res) => {
    const {id} = req.params
    const videos = await Videos.read()
    const userVideos = videos.filter(video => video.user_id == id)
    res.render('videos', {userVideos})
})


module.exports = router