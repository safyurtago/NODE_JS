const IO = require('../utils/io')
const User = require('../models/User.model')

const Users = new IO(process.cwd() + '/database/users.json')

const isAuth = async (ctx, next) => {
    const users = await Users.read()
    const telegramId = ctx.from.id
    const findUser = users.find((user) => user.telegramId === telegramId)

    if (!findUser) {
        const newUser = new User(ctx.from.first_name, telegramId)
        const data = users.length ? [...users, newUser] : [newUser]
        await Users.write(data)
    } 
    next()
}

module.exports = {
  isAuth
}