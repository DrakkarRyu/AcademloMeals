const express = require('express');

// middlewares
//const { userExist } = require('../middlewares/user.middlewares');

//controllers

const {
  createRestaurant,
  getAllRestaurants,
} = require('../controllers/restaurant.controller');

const router = express.Router();

// petitions
router.post('/', createRestaurant);
router.get('/', getAllRestaurants);

module.exports = { restaurantRouter: router };
