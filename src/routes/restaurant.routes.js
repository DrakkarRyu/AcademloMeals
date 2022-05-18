const express = require('express');

// middlewares
const { restaurantExist } = require('../middlewares/restaurant.middlewares');
const { reviewExist } = require('../middlewares/review.middlewares');
const { protectAdmin } = require('../middlewares/user.middlewares');
const {
  createRestaurantValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

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
router.post(
  '/',
  createRestaurantValidations,
  checkValidations,
  createRestaurant
);
router.get('/', getAllRestaurants);

router
  .route('/:id')
  .get(restaurantExist, getRestaurantById)
  .patch(restaurantExist, protectAdmin, updateRestaurant)
  .delete(restaurantExist, protectAdmin, deleteRestaurant);

//petitions of reviews
router.post('/reviews/:id', createReview);
router.put('/reviews/:id', reviewExist, updateReview);
router.delete('/reviews/:id', reviewExist, deleteReview);

module.exports = { restaurantRouter: router };
