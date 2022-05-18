const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');
const { catchAsync } = require('../utils/catchAsync');

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;
  const meal = await Meal.findOne({ where: { id: mealId } });
  const totalPrice = meal.price * quantity;

  const newOrder = await Order.create({
    quantity,
    mealId,
    userId: sessionUser.id,
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
