const {Router} = require("express")
const { login, register } = require("../controllers/auth.controller")


const router = Router()

router.post('/auth/register', register)
router.post('/auth/login', login)

router.get('/auth/register', (req, res) => {
    res.render('register')
})
router.get('/auth/login', (req, res) => {
    res.render('login')
})


module.exports = router