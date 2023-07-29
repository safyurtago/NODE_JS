const {Router} = require("express");

const { blogControlCreate, blogControlGet } = require("../controllers/blog.controller");
const isAuth = require("../middlewares/isAuth.middleware");


const router = Router()
router.post("/blog/create", isAuth, blogControlCreate)
router.get("/blog/:id", isAuth, blogControlGet)



module.exports = router;