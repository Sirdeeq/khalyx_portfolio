const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().allow(''),
  category: Joi.string().allow(''),
  status: Joi.string().valid('Planned', 'In Development', 'Coming Soon'),
  image: Joi.string().allow(''),
  order: Joi.number().integer().min(0),
});

exports.update = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().allow(''),
  category: Joi.string().allow(''),
  status: Joi.string().valid('Planned', 'In Development', 'Coming Soon'),
  image: Joi.string().allow(''),
  order: Joi.number().integer().min(0),
});
