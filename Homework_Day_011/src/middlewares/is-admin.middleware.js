const IO = require("../utils/io")
const Users = new IO(process.cwd() + "/database/users.json");

const isAdmin = async (req, res, next) => {
    const {id} = req.user;
    
    const users = await Users.read()

    const user = users.find((user) => user.id == id)

    if (!user.isAdmin) return res.status(403).json({error: "You are not an admin"})
    next()
}

module.exports = isAdmin;