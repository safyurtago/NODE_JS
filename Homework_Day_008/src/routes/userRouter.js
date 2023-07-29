const {Router} = require("express")
const router = Router()
const {register, getAll, login, remove, transitMoney} = require(process.cwd() + "/src/controllers/userController")

router.post("/register", )

router.post("/register", register)
router.get("/users", getAll)
router.post("/login", login)
router.delete("/user", remove)
router.put("/transit", transitMoney)


module.exports = router