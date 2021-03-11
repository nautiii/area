//validation with joi
const Joi = require('@hapi/joi');

const checkRegisterValidate = (authData) => {
    const schema = Joi.object().keys({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return {error} = schema.validate(authData);
}

const checkLoginValidate = (authData) => {
    const schema = Joi.object().keys({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    return {error} = schema.validate(authData);
}

module.exports.checkRegisterValidate = checkRegisterValidate;
module.exports.checkLoginValidate = checkLoginValidate;