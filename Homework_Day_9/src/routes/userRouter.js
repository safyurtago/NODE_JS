const {Router} = require("express")
const {userControlRegister, userControlLogin, userControlTransit, userControlDelete} = require(process.cwd() + "/src/controllers/userController")
const {userMiddlewareRegister, userMiddlewareLogin, userMiddlewareTransit, userMiddlewareDelete} = require(process.cwd() + "/src/middlewares/userMiddleware")

const router = Router()

router.post("/register", userMiddlewareRegister, userControlRegister)
router.post("/login", userMiddlewareLogin, userControlLogin)
router.put("/transit", userMiddlewareTransit, userControlTransit)
router.delete("/delete", userMiddlewareDelete, userControlDelete)

module.exports = router