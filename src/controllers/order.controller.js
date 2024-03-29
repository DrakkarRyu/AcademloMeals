const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const { quantity, mealId } = req.body;

  const orderPrice = await Meal.findOne({
    where: { id: mealId, status: 'active' },
  });
  if (!orderPrice) {
    return next(new AppError('Meal does not exist with given mealId', 404));
  }

  const newOrder = await Order.create({
    quantity,
    mealId,
    totalPrice: quantity * orderPrice.price,
    userId: sessionUser.id,
  });

  res.status(201).json({ newOrder });
});

const getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const order = await Order.findAll({
    where: { userId: sessionUser.id },
    include: [
      {
        model: Meal,
        include: [{ model: Restaurant }],
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
    order,
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: 'cancelled' });
  res.status(200).json({
    status: 'success',
    order,
  });
});

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
