const Joi = require('joi');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      // Validate parameter name follow schema
      const result = Joi.validate({ userId: req['params'][name] }, schema);
      
      // Error handle
      if (result.error) {
        return res.status(400).json(result.error);
      } 

      // Create property if not exists
      req.value = req.value || {};
      req.value['params'] = req.value['params'] || {};
      req.value['params'][name] = result.value.userId;

      next();
    };
  },

  schemas: {
    idSchema: Joi.object().keys({
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  }
};