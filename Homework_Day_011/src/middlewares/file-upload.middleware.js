const path = require("path")
const {v4: uuid} = require("uuid")


const fileUpload = (req, res, next) => {
    const file = req.files?.photo

    if (!file) return res.status(400).json({message: "Image is required"})

    const mimetype = path.extname(file.name)
    const imageName = uuid() + mimetype

    file.mv(`${process.cwd()}/uploads/${imageName}`)
    req.imageName = imageName

    next() 
}

module.exports = {
    fileUpload
}