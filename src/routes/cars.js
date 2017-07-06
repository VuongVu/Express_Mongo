const express = require('express');
const router = express.Router();

const CarsController = require('../controllers/cars');

router.route('/')
  .get(CarsController.index);

module.exports = router;