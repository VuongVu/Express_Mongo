const Joi = require('joi');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      // Validate parameter name follow schema
      const result = Joi.validate({ param: req['params'][name] }, schema);
      
      // Error handle
      if (result.error) {
        return res.status(400).json(result.error);
      } 

      // Create property if not exists
      req.value = req.value || {};
      req.value['params'] = req.value['params'] || {};
      req.value['params'][name] = result.value.param;

      next();
    };
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(result.error);
      }

      req.value = req.value || {};
      req.value['body'] = req.value['body'] || {};
      req.value['body'] = result.value;

      next();
    };
  },

  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    userSchema: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required()
    }),

    userOptionalSchema: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email()
    }),

    userCarSchema: Joi.object().keys({
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required()
    }),

    carSchema: Joi.object().keys({
      seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required()
    }),

    carOptionalSchema: Joi.object().keys({
      seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      make: Joi.string(),
      model: Joi.string(),
      year: Joi.number()
    }),

    newCarSchema: Joi.object().keys({
      seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required()
    })
  }
};