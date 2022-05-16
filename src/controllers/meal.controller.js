const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { catchAsync } = require('../utils/catchAsync');

const createMeal = catchAsync(async (req, res, next) => {
  const { name, price, restaurantId } = req.body;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId,
  });
  res.status(201).json({
    newMeal,
  });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meal = await Meal.findAll({
    where: { status: 'active' },
    include: [
      {
        model: Restaurant,
        attributes: { include: ['id'] },
      },
    ],
  });

  res.status(201).json({
    meal,
  });
});

const getMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: { id },
    include: [
      {
        model: Restaurant,
        attributes: { include: ['id'] },
      },
    ],
  });

  res.status(200).json({
    meal,
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;
  await meal.update({ name, price });
  res.status(200).json({ status: 'success' });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await meal.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
