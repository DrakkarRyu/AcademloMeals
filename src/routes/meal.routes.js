const express = require('express');

// middlewares
const { mealExist } = require('../middlewares/meal.middlewares');
const { protectAdmin } = require('../middlewares/user.middlewares');
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
router.post('/:id', createMealValidations, checkValidations, createMeal);

router
  .route('/:id')
  .get(mealExist, getMealById)
  .patch(mealExist, protectAdmin, updateMeal)
  .delete(mealExist, protectAdmin, deleteMeal);

module.exports = { mealRouter: router };
