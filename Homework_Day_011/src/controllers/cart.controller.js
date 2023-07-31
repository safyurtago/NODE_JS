

const IO = require(process.cwd()+ "/src/utils/io")
const Cart  = require(process.cwd() + "/src/models/Cart.model")
const jwt = require(process.cwd() + "/src/utils/jwt")

const Products = new IO(process.cwd() + "/database/products.json")
const Carts = new IO(process.cwd() + "/database/carts.json")

const addCart = async (req, res) => {
    try {
        const {id} = req.user
        const carts = await Carts.read()
        const findCart = carts.find((cart) => cart.owner == id)
        if (findCart) return res.status(400).json({message: "You have already had a cart"})
        const cartId = (carts[carts.length - 1]?.id || 0) + 1
        const newCart = new Cart(cartId, id)
        const data = carts.length ? [...carts, newCart] : [newCart]
        await Carts.write(data)
        res.status(201).json({message: "Cart added"})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

const addToCart = async (req, res) => {
    try {
        const productId = req.params.id
        const products = await Products.read()
        const findProduct = products.find((product) => product.id == productId)
        if (!findProduct) return res.status(404).json({message: "Product not found"})
        const ownerId = req.user.id
        const carts = await Carts.read()
        const findCart = carts.find((cart) => cart.owner == ownerId)
        if (!findCart) return res.status(404).json({message: "You don't have a cart"})
        findCart.cart.push(productId)
        await Carts.write(carts)
        res.status(201).json({message: "Item added to cart"})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}
const getAll = async (req, res) => {
    const ownerId = req.user.id
    const carts = await Carts.read()
    const findCart = carts.find((cart) => cart.owner == ownerId)
    if (!findCart) return res.status(404).json({message: "You don't have a cart"})
    res.status(200).json(findCart)
}

const removeFromCart = async (req, res) => {
    const ownerId = req.user.id
    const carts = await Carts.read()
    const newCarts = carts.filter((cart) => cart.owner != ownerId)
    await Carts.write(newCarts)
    res.status(200).json({message: "Item removed from cart"})
}

module.exports = {
    addCart,
    addToCart,
    getAll,
    removeFromCart,
}