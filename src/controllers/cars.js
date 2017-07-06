const Car = require('../models/car');

module.exports = {

  /**
   * Get all cars
   */
  index: async (req, res, next) => {
    try {
      const cars = await Car.find({});

      res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }
};