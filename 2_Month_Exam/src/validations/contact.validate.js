const Joi = require('joi');

const contactValidate = (req, res, next) => {
    const {name, phoneNumber, email, message} = req.body;
    const schema = Joi.object({
        name: Joi.string().required(),
        phoneNumber: Joi.number().required(),
        email: Joi.string().email().required(),
        message: Joi.string().required()
    })
    const result = schema.validate({name, phoneNumber, email, message});
    if (result.error) {
        return res.status(400).json({error: result.error.details[0].message});
    }
    next();
}

module.exports = {contactValidate};