const express = require('express');

// middlewares
const { mealExist } = require('../middlewares/meal.middlewares');

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
router.post('/:id', createMeal);
router.get('/', getAllMeals);

router
  .route('/:id')
  .get(mealExist, getMealById)
  .patch(mealExist, updateMeal)
  .delete(mealExist, deleteMeal);

module.exports = { mealRouter: router };
