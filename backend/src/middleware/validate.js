const { error } = require('../utils/apiResponse');

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error: validationError, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (validationError) {
      const messages = validationError.details.map((d) => d.message);
      return error(res, 'Validation failed', 400, messages);
    }

    req[property] = value;
    next();
  };
};

module.exports = validate;
