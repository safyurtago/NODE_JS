const {Router} = require("express");

const { userControlRegister, userControlLogin } = require("../controllers/auth.controller");


const router = Router()
router.post("/auth/register",userControlRegister )
router.post("/auth/login", userControlLogin)

module.exports = router;