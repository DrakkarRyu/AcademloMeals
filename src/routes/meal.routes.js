const express = require('express');

// middlewares
const { mealExist } = require('../middlewares/meal.middlewares');
const {
  protectAdmin,
  protectToken,
} = require('../middlewares/user.middlewares');
const {
  createMealValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

//controllers

const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controller');

const router = express.Router();

// petitions
router.get('/', getAllMeals);
router.get('/:id', mealExist, getMealById);

//protect token start here
router.use(protectToken);

router.post(
  '/:id',
  protectAdmin,
  createMealValidations,
  checkValidations,
  createMeal
);

router
  .route('/:id')
  .patch(mealExist, protectAdmin, updateMeal)
  .delete(mealExist, protectAdmin, deleteMeal);

module.exports = { mealRouter: router };
