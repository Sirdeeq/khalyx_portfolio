const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required().trim(),
  role: Joi.string().allow(''),
  description: Joi.string().allow(''),
  logo: Joi.string().allow(''),
  url: Joi.string().allow(''),
  order: Joi.number().integer().min(0),
});

exports.update = Joi.object({
  name: Joi.string().trim(),
  role: Joi.string().allow(''),
  description: Joi.string().allow(''),
  logo: Joi.string().allow(''),
  url: Joi.string().allow(''),
  order: Joi.number().integer().min(0),
});
