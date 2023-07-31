
const authRouter = require("./auth.route")
const usersRouter = require("./users.route")
const orderRouter = require("./order.route")
const productRouter = require("./product.route")
const favouritesRouter = require("./favourites.route")
const cartRouter = require("./cart.route")


module.exports = [
    authRouter,
    usersRouter,
    orderRouter,
    productRouter,
    favouritesRouter,
    cartRouter
]
