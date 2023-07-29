const jwt = require("jsonwebtoken")

const config = require(process.cwd() + "/config")

const isAuth = (req, res, next) => {
    const token = req.headers.token
    if (!token) return res.status(401).json({message: "Invalid token"})
    
    jwt.verify(token, config.secret_key, (error, data) => {
        if (error) return res.status(401).json({message: "Invalid token"})
        req.userId = data.id
    })
    next()
}

module.exports = isAuth;