const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
  
  /**
   * Get all users
   */
  index: async (req, res, next) => {
    try {
      const users = await User.find({});

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create new a user
   */
  newUser: async (req, res, next) => {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save();

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get User by user's id
   */
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const user = await User.findById(userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Replace user
   * NOTES: enforce that req.body must contain all the fields
   */
  replaceUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const newUser = req.body;

      await User.findByIdAndUpdate(userId, newUser);

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update user's information
   * NOTES: req.body may contain any number of fields
   */
  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const newUser = req.body;
      
      await User.findByIdAndUpdate(userId, newUser);

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all user's cars
   */
  getUserCars: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).populate('cars');

      res.status(200).json(user.cars);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create new User's cars
   */
  newUserCar: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const newCar = new Car(req.body);
      
      // Get user
      const user = await User.findById(userId);
      // Assign user as a car's seller
      newCar.seller = user;
      // Save the car
      await newCar.save();
      // Add car to the user's selling array 'cars'
      user.cars.push(newCar);
      // Save the user
      await user.save();

      res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }
};