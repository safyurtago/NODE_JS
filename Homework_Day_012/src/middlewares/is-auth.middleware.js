const jwt = require(process.cwd() + "/src/utils/jwt")

const isAuth = (req, res, next) => {
    const token = req.cookies?.token

    if (!token) return res.status(401).json({message: 'Invalid token'})

    jwt.verify(token, (err, decoded) => {
        if (err) return res.status(401).json({message: 'Invalid token'})
        req.user = decoded
        next()
    })
}

module.children = isAuth;