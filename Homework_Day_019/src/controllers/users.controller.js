const IO = require('../utils/io')

const Users = new IO(process.cwd() + '/database/users.js')


const getAll = async (req, res) => {
    const users = await Users.read()
    res.json({users})
}

const getOne = async (req, res) => {
  const {id} = req.params
  const users = await Users.read()
  const findUser = users.find(user => user.id === id)
  res.json({user: findUser})
}

module.exports = {
  getAll,
  getOne
}