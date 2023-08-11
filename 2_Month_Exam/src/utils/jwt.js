const jwt = require('jsonwebtoken');

const config = require('../../config');

const sign = (payload) => { return jwt.sign(payload, config.jwtSecretKey); };

const verify = (payload, callback) => { return jwt.verify(payload, config.jwtSecretKey, callback); };

module.exports = { sign, verify };