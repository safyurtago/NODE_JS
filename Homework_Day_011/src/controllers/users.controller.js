const IO = require("../utils/io")
const Users = new IO(process.cwd() + "/database/users.json");


const find = async (req, res) => {
    try {
        const users = await Users.read()
        res.json({users})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {
    find
};