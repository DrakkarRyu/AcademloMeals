const express = require('express');

// middlewares
const { restaurantExist } = require('../middlewares/restaurant.middlewares');
const { reviewExist } = require('../middlewares/review.middlewares');

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

//petitions of reviews
router.post('/reviews/:id', createReview);
router.put('/reviews/:id', reviewExist, updateReview);
router.delete('/reviews/:id', reviewExist, deleteReview);

module.exports = { restaurantRouter: router };
