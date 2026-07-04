const Joi = require('joi');

exports.create = Joi.object({
  num: Joi.string().required(),
  name: Joi.string().required().trim(),
  category: Joi.string().required().trim(),
  features: Joi.string().allow(''),
  role: Joi.string().allow(''),
  url: Joi.string().uri().allow(''),
  col1_img1: Joi.string().allow(''),
  col1_img2: Joi.string().allow(''),
  col2_img: Joi.string().allow(''),
  order: Joi.number().integer().min(0),
});

exports.update = Joi.object({
  num: Joi.string(),
  name: Joi.string().trim(),
  category: Joi.string().trim(),
  features: Joi.string().allow(''),
  role: Joi.string().allow(''),
  url: Joi.string().uri().allow(''),
  col1_img1: Joi.string().allow(''),
  col1_img2: Joi.string().allow(''),
  col2_img: Joi.string().allow(''),
  order: Joi.number().integer().min(0),
});
