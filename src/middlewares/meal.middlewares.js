const { Meal } = require('../models/meal.model');

// utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

// user exist
const mealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: { id, status: 'active' },
  });

  if (!meal) {
    return next(new AppError('meal not found with that id', 404));
  }
  req.meal = meal;
  next();
});

module.exports = { mealExist };
