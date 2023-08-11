const jwt = require('../utils/jwt')

const isAuth = (req, res, next) => {
    const token = req.headers?.token
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    jwt.verify(token, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Unauthorized'})
        }
        req.user = decoded
        next()
    })
}

module.exports = {isAuth}