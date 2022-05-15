const { Restaurant } = require('../models/restaurant.model');

// utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

// user exist
const restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findOne({
    where: { id, status: 'active' },
  });

  if (!restaurant) {
    return next(new AppError('restaurant not found with that id', 404));
  }
  req.restaurant = restaurant;
  next();
});

module.exports = { restaurantExist };
