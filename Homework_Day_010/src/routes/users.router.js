const {Router} = require("express");

const { getProfile } = require("../controllers/users.controller");
const isAuth = require("../middlewares/isAuth.middleware");


const router = Router()

router.get("/users/profile", isAuth, getProfile)


module.exports = router