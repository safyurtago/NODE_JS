const {Router} = require("express")

const {login, register} = require(process.cwd() + "/src/controllers/auth.controller")

const router = Router()


router.post('/auth/login', login)
router.post('/auth/register', register)


module.exports = router;