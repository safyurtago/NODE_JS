require("dotenv").config()

const {env} = process

const config = {
    port: env.PORT || 6000,
    secret_key: env.SECRET_KEY
}

module.exports = config