const {Router} = require("express")
const { createProduct, getProducts, getProduct, editProduct, removeProduct } = require("../controllers/product.controller")
const {fileUpload} = require("../middlewares/file-upload.middleware")
const isAuth = require("../middlewares/isAuth.middleware")
const isAdmin = require("../middlewares/is-admin.middleware")

const router = Router()

router.post("/products", isAuth, isAdmin, fileUpload, createProduct)
router.get("/products", getProducts)
router.get("/product/:id", getProduct)
router.put("/product/:id", isAuth, editProduct)
router.delete("/product/:id", isAuth, removeProduct)


module.exports = router