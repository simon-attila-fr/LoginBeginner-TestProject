const Joi = require('joi');
const registerSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required,
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(255)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$'))
        .required()
});

const validateRegister = (req, res, next) => {
    const { username, password } = req.body;

    const { error } = registerSchema.validate(
        { username, password },
        { abortEarly: false }
    );

    if (error) {
        res.status(422).json({ validationErrors: error.details[0].message });
    } else {
        next();
    }
};

module.exports = {
    validateRegister,
};
