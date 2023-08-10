require('dotenv/config')

const {env} = process

const config = {
    port: env.PORT || 8080,
    jwtSecretKey: env.jwtSecretKey
}

module.exports = config;