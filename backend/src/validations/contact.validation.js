const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  phone: Joi.string().allow(''),
  reason: Joi.string().allow(''),
  message: Joi.string().required(),
});

exports.reply = Joi.object({
  reply: Joi.string().required(),
});
