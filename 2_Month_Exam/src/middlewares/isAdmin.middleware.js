const IO = require('../utils/io')

const Users = new IO(process.cwd() + '/database/users.json')

const jwt = require('../utils/jwt')

const isAdmin = (req, res, next) => {
    const token = req.headers?.token
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    jwt.verify(token, async (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Unauthorized'})
        }
        req.user = decoded; 
        const users = await Users.read()
        const findUser = users.find(user => user.id === req.user)
        if (findUser.isAdmin) next()
        else res.status(401).json({message: 'You do not have permission to access this'})
    })
}

module.exports = {isAdmin}