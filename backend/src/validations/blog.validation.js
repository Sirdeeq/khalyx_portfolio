const Joi = require('joi');

exports.create = Joi.object({
  title: Joi.string().required().trim(),
  slug: Joi.string().required().trim().lowercase(),
  excerpt: Joi.string().allow(''),
  content: Joi.string().required(),
  image: Joi.string().allow(''),
  author: Joi.string().default('Sadiq Baba Idris'),
  tags: Joi.array().items(Joi.string()),
  readTime: Joi.string().allow(''),
  isPublished: Joi.boolean(),
  order: Joi.number().integer().min(0),
});

exports.update = Joi.object({
  title: Joi.string().trim(),
  slug: Joi.string().trim().lowercase(),
  excerpt: Joi.string().allow(''),
  content: Joi.string(),
  image: Joi.string().allow(''),
  author: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  readTime: Joi.string().allow(''),
  isPublished: Joi.boolean(),
  order: Joi.number().integer().min(0),
});
