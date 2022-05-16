const { Review } = require('../models/review.model');

// utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

// user exist
const reviewExist = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;
  const review = await Review.findOne({
    where: { id, restaurantId },
  });

  if (!review) {
    return next(new AppError('order not found with that id', 404));
  }
  req.review = review;
  next();
});

module.exports = { reviewExist };
