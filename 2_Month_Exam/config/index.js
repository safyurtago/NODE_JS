require('dotenv/config')

const {env} = process

const config = {
    port: env.PORT || 8080,
    jwtSecretKey: env.JWT_SECRET_KEY
}


module.exports = config