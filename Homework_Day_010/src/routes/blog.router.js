const {Router} = require("express");

const { blogControlPost, blogControlGet } = require("../controllers/blog.controller");
const isAuth = require("../middlewares/isAuth.middleware");


const router = Router()
router.post("/post", isAuth, blogControlPost)
router.get("/blog/:id", isAuth, blogControlGet)



module.exports = router;