require('dotenv/config')

const {env} = process
const config = {
    BOT_TOKEN: env.BOT_TOKEN
}

module.exports = config;