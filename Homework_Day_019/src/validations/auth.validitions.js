const Joi = require('joi');

const authValidate = (req, res, next) => {
    const {firstName, lastName, username, password, age} = req.body
    const file = req.files.photo
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        age: Joi.number().required(),
    })
    const {error} = schema.validate({firstName, lastName, username, password, age})
    if(error){
        return res.status(400).json({error: error.message})
    }
    next()
}

module.exports = {
    authValidate
}