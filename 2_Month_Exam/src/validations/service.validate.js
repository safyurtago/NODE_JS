const Joi = require('joi');

const serviceValidate = (req, res, next) => {
    const {serviceName} = req.body
    const file = req.files.photo
    const schema = Joi.object({
        serviceName: Joi.string().required(),
        file: Joi.required()
    })
    const {error} = schema.validate({serviceName, file})
    if(error){
        return res.status(400).json({error: error.details[0].message})
    }
    next()
}

module.exports = serviceValidate