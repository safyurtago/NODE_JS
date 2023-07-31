const {Router} = require("express")
const { addCart, getAll, removeFromCart, addToCart} = require(process.cwd() + "/src/controllers/cart.controller")
const isAuth = require(process.cwd() + "/src/middlewares/isAuth.middleware")

const router = Router()


router.post("/addCard", isAuth, addCart) 
router.put("/addToCard/:id", isAuth, addToCart) 
router.get("/Card", isAuth, getAll) 
router.delete("/Card", isAuth, removeFromCart) 


module.exports = router