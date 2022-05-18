const express = require('express');

// middlewares
const { restaurantExist } = require('../middlewares/restaurant.middlewares');
const { reviewExist } = require('../middlewares/review.middlewares');
const {
  protectAdmin,
  protectAccountOwner,
  protectToken,
} = require('../middlewares/user.middlewares');
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
router.get('/', getAllRestaurants);
router.get('/:id', restaurantExist, getRestaurantById);

//protect token start here
router.use(protectToken);

router.post(
  '/',
  createRestaurantValidations,
  checkValidations,
  createRestaurant
);

router
  .route('/:id')
  .patch(restaurantExist, protectAdmin, updateRestaurant)
  .delete(restaurantExist, protectAdmin, deleteRestaurant);

//petitions of reviews
router.post('/reviews/:id', createReview);
router.patch('/reviews/:id', reviewExist, protectAccountOwner, updateReview);
router.delete('/reviews/:id', reviewExist, protectAccountOwner, deleteReview);

module.exports = { restaurantRouter: router };
