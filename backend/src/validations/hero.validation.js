const Joi = require('joi');

exports.update = Joi.object({
  roles: Joi.array().items(Joi.string().trim()),
  tagline: Joi.string().allow(''),
  portrait: Joi.string().uri().allow(''),
});
