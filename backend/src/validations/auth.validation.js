const Joi = require('joi');

exports.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

exports.changePassword = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required().min(6),
});
