const {Router} = require("express")

const { addFavourite, getAll, removeFromFavourite, addToFavourite} = require(process.cwd() + "/src/controllers/favourites.controller")
const isAuth = require(process.cwd() + "/src/middlewares/isAuth.middleware")

const router = Router()

router.post("/addFavourite", isAuth, addFavourite) 
router.put("/addToFavourite/:id", isAuth, addToFavourite) 
router.get("/Favourite", isAuth, getAll) 
router.delete("/Favourite", isAuth, removeFromFavourite)



module.exports = router;