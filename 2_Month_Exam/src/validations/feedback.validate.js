const Joi = require('joi');

const feedbackValidate = async (req, res, next) => {
    const {personName, personJob, personFeedback} = req.body;
    const file = req.files.photo;
    const schema = Joi.object({
        personName: Joi.string().required(),
        personJob: Joi.string().required(),
        personFeedback: Joi.string().required(),
        file: Joi.required()
    });
    const result = schema.validate({personName, personJob, personFeedback, file});
    if (result.error) {
        return res.status(400).json({message: result.error.details[0].message});
    }
    next();
}

module.exports = {feedbackValidate};