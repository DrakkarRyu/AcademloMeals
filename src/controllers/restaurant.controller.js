const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');
const { Review } = require('../models/review.model');
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
  const restaurant = await Restaurant.findAll({
    where: { status: 'active' },
    include: [
      {
        model: Meal,
        where: { status: 'active' },
      },
      {
        model: Review,
        where: { status: 'active' },
      },
    ],
  });
  res.status(201).json({
    restaurant,
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id },
    include: [
      {
        model: Meal,
        attributes: { include: ['restaurantId'] },
      },
      { model: Review, attributes: { include: ['restaurantId'] } },
    ],
  });

  res.status(200).json({
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;
  await restaurant.update({ name, address });
  res.status(200).json({ status: 'success' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  await restaurant.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
