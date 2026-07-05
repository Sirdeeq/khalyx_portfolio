const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required().trim(),
  role: Joi.string().allow(''),
  company: Joi.string().allow(''),
  text: Joi.string().required(),
  avatar: Joi.string().allow(''),
  rating: Joi.number().integer().min(1).max(5),
  order: Joi.number().integer().min(0),
});

exports.update = Joi.object({
  name: Joi.string().trim(),
  role: Joi.string().allow(''),
  company: Joi.string().allow(''),
  text: Joi.string(),
  avatar: Joi.string().allow(''),
  rating: Joi.number().integer().min(1).max(5),
  order: Joi.number().integer().min(0),
});
