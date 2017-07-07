const Car = require('../models/car');
const User = require('../models/user');

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
  },

  newCar: async (req, res, next) => {
    try {
      // Find the actual seller
      const seller = await User.findById(req.value.body.seller);

      // Create a new car
      const newCar = req.value.body;
      delete newCar.seller;

      const car = new Car(newCar);
      car.seller = seller;
      await car.save();

      // Add newly created car to the actual seller
      seller.cars.push(car);
      await seller.save();
      
      return res.status(201).json(car);
    } catch (error) {
      next(error);
    }
  },

  getCar: async (req, res, next) => {
    try {
      const { carId } = req.value.params;

      const car = await Car.findById(carId);

      return res.status(200).json(car);
    } catch (error) {
      next();
    }
  },

  replaceCar: async (req, res, next) => {
    try {
      const { carId } = req.value.params;
      const newCar = req.value.body;

      await Car.findByIdAndUpdate(carId, newCar);

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      const { carId } = req.value.params;
      const newCar = req.value.body;

      await Car.findByIdAndUpdate(carId, newCar);

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      const { carId } = req.value.params;

      // Get a car
      const car = await Car.findById(carId);
      if (!car) {
        return res.status(404).json({ error: 'Car doesn\'t exist' });
      }

      // Get a seller
      const sellerId = car.seller;
      const seller = await User.findById(sellerId);

      // Remove the car
      await car.remove();
      // Remove car from the seller's selling list
      seller.cars.pull(car);
      await seller.save();

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
};