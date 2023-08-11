const Joi = require('joi');

const userRegisterValidate = (req, res, next) => {
    const {firstName, lastName, username, email, password } = req.body;
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    const result = schema.validate({firstName, lastName, username, email, password});
    if (result.error) {
        return res.status(400).json({error: result.error.details[0].message});
    }
    next();
}

module.exports = {userRegisterValidate};