const Joi = require("joi");

// validation for sign up and update user
const userInputValidation = (req, res, next) => {
  const { fullname, email, password, requisite } = req.body;
  const validateData = Joi.object({
    fullname: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(16).alphanum().required(),
    requisite: Joi.string().required()
  });
  const { error } = validateData.validate({
    fullname: fullname,
    email: email,
    password: password,
    requisite: requisite
  });
  if (error) {
    const errorMessage = error.details[0].message;
    return next({ status: 422, message: errorMessage });
  } else {
    next();
  }
};

module.exports = {
  userInputValidation
};
