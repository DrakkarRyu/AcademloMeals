const express = require('express');

// middlewares
const { restaurantExist } = require('../middlewares/restaurant.middlewares');

//controllers

const {
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurant.controller');

const router = express.Router();

// petitions
router.post('/', createRestaurant);
router.get('/', getAllRestaurants);

router
  .route('/:id')
  .get(restaurantExist, getRestaurantById)
  .patch(restaurantExist, updateRestaurant)
  .delete(restaurantExist, deleteRestaurant);

router.post('/reviews/:id', createReview);
router.put('/reviews/:restaurantId/:id', updateReview);
router.delete('/reviews/:restaurantId/:id', deleteReview);

module.exports = { restaurantRouter: router };
