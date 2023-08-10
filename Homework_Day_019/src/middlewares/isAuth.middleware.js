const jwt = require('../utils/jwt');

const IO = require('../utils/io')

const Users = new IO(process.cwd() + '/database/users.js')

const isAuth = (req, res, next) => {
    const token = req.headers.token
    if (!token) {
        res.status(401).json({message: 'Invalid token'})
    }
    jwt.verify(token, (err, decoded) => {
        if (err) {
            res.status(401).json({message: 'Invalid token'})
        }
    });
    next()
};

module.exports = isAuth;