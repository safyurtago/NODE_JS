const IO = require(process.cwd()+ "/src/utils/io")
const Favourite  = require(process.cwd() + "/src/models/Favourite.model")
const Favourites = new IO(process.cwd() + "/database/favourites.json")
const Products = new IO(process.cwd() + "/database/products.json")


const addFavourite = async (req, res) => {
    try {
        const {id} = req.user
        const favourites = await Favourites.read()
        const findFavourite = favourites.find((favourite) => favourite.owner == id)
        if (findFavourite) return res.status(400).json({message: "You have already had a favourite"})
        const favouriteId = (favourites[favourites.length - 1]?.id || 0) + 1
        const newFavourite = new Favourite(favouriteId, id)
        const data = favourites.length ? [...favourites, newFavourite] : [newFavourite]
        await Favourites.write(data)
        res.status(201).json({message: "Favourite added"})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

const addToFavourite = async (req, res) => {
    try {
        const productId = req.params.id
        const products = await Products.read()
        const findProduct = products.find((product) => product.id == productId)
        if (!findProduct) return res.status(404).json({message: "Product not found"})
        const ownerId = req.user.id
        const favourites = await Favourites.read()
        const findFavourite = favourites.find((favourite) => favourite.owner == ownerId)
        if (!findFavourite) return res.status(404).json({message: "You don't have a favourite"})
        findFavourite.favouriteList.push(productId)
        await Favourites.write(favourites)
        res.status(201).json({message: "Item added to favourite"})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}
const getAll = async (req, res) => {
    const ownerId = req.user.id
    const favourites = await Favourites.read()
    const findFavourite = favourites.find((favourite) => favourite.owner == ownerId)
    if (!findFavourite) return res.status(404).json({message: "You don't have a favourite"})
    res.status(200).json(findFavourite)
}

const removeFromFavourite = async (req, res) => {
    const ownerId = req.user.id
    const favourites = await Favourites.read()
    const newFavourites = favourites.filter((favourite) => favourite.owner != ownerId)
    await Favourites.write(newFavourites)
    res.status(200).json({message: "Item removed from favourite"})
}

module.exports = {
    addFavourite,
    addToFavourite,
    getAll,
    removeFromFavourite,
}