const User = require('../models/user');

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
      const { userId } = req.params;
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
  }
};