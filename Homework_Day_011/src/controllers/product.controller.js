const Joi = require("joi")

const IO = require(process.cwd() + "/src/utils/io")
const Products = new IO(process.cwd() + "/database/products.json")

const Product = require(process.cwd() + "/src/models/Product.model")

const createProduct = async (req, res) => {
    
   try {
     const {imageName} = req
     const {title, description, sell, buy, count} = req.body
     const schema = Joi.object({
      title: Joi.string().min(3).max(256).required(),
      description: Joi.string().min(5).max(1024).required(),
      sell: Joi.number().min(1).required(),
      buy: Joi.number().min(1).required(),
      count: Joi.number().min(1).required(),
    });

    const {error} = schema.validate({title, description, sell, buy, count});
    if (error) return res.status(400).json({message: error.message});

     const products = await Products.read()
     const id = (products[products.length - 1]?.id || 0) + 1
     const newProduct = new Product(id, title, description, imageName, sell, buy, count)
     const data = products.length ? [... products, newProduct] : [newProduct]
     await Products.write(data)
     res.status(201).json({message: "Success", data: newProduct})
   } 
   catch (error) {
        res.status(400).json({message: "Internal Server Error"})
   }
}

const getProduct = async (req, res) => {
  try {
    const {id} = req.params
    const products = await Products.read()
    const product = products.find(p => p.id == +id)
    res.json({data: product})
  } catch (error) {
    return res.status(500).json({message: "Internal Server Error"})
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Products.read()
    res.json({data: products})
  } catch (error) {
    return res.status(500).json({message: "Internal Server Error"})
  }
}

const editProduct = async (req, res) => {
  try {
    const {id} = req.params
    const products = await Products.read()
    const findProduct = products.find(product => product.id == id)
    if (!findProduct) return res.status(404).json({message: "Product Not Found"})

    const {title, description, sell, count, buy} = req.body
    
    const schema = Joi.object({
      title: Joi.string().min(3).max(256).required(),
      description: Joi.string().min(5).max(1024).required(),
      sell: Joi.number().min(1).required(),
      buy: Joi.number().min(1).required(),
      count: Joi.number().min(1).required(),
    });

    const {error} = schema.validate({title, description, sell, buy, count});
    if (error) return res.status(400).json({message: error.message});
    
    findProduct.title = title
    findProduct.description = description
    findProduct.sell = sell
    findProduct.buy = buy
    findProduct.count = count
    await Products.write(products)
    res.json({message: "Success", data: findProduct})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
}

const removeProduct = async (req, res) => {
  const {id} = req.params
  const products = await Products.read()
  const newProducts = products.filter(product => product.id != id)
  await Products.write(newProducts)
  res.json({message: "Deleted"})
}

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    editProduct,
    removeProduct,
}