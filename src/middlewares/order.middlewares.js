const { Order } = require('../models/order.model');

// utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

// user exist
const orderExist = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({
    where: { status: 'active' },
  });

  if (!order) {
    return next(new AppError('order not found with that id', 404));
  }
  req.order = order;
  next();
});

module.exports = { orderExist };
