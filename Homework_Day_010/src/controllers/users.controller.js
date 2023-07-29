

const IO = require(process.cwd() + "/src/utils/io")
const Users = new IO(process.cwd() + "/database/users.json")
const getFunction = require(process.cwd() + "/src/utils/get")


const getProfile = async (req, res) => {
    try {
        const id = req.userId
        const users = await getFunction(Users)
        const findUser = users.find(user => user.id == id)
        delete findUser.password
        res.json({message: "Success", data: findUser})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {
    getProfile,

}