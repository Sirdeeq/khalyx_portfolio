const Joi = require('joi');

exports.update = Joi.object({
  bio: Joi.string().allow(''),
  passion: Joi.string().allow(''),
  values: Joi.array().items(Joi.string().trim()),
});
