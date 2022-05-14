const { Restaurant } = require('../models/restaurant.model');

const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });
  res.status(201).json({
    newRestaurant,
  });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({ where: { status: 'active' } });

  res.status(201).json({
    restaurant,
  });
});

//const getRestaurantById = catchAsync(async (req, res, next) => {
//})

module.exports = {
  createRestaurant,
  getAllRestaurants,
};
