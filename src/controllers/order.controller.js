const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');
const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId, userId, totalPrice } = req.body;

  const newOrder = await Order.create({
    quantity,
    mealId,
    userId,
    totalPrice,
  });
  res.status(201).json({
    newOrder,
  });
});

const getOrders = catchAsync(async (req, res, next) => {
  const order = await Order.findAll({
    include: [
      {
        model: Meal,
        where: { status: 'active' },
        include: [{ model: Restaurant, where: { status: 'active' } }],
      },
    ],
  });
  res.status(201).json({
    order,
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: 'completed' });
  res.status(200).json({
    status: 'success',
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: 'cancelled' });
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
