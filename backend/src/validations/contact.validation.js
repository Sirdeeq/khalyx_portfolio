const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  reason: Joi.string().allow(''),
  message: Joi.string().required(),
});
