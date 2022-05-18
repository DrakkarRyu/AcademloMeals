const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');

// utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

// user exist
const reviewExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({
    where: { id, status: 'avaible' },
    include: [{ model: User, attributes: { exclude: ['password'] } }],
  });

  if (!review) {
    return next(new AppError('not exist a review with that id', 404));
  }
  req.review = review;
  req.user = review.user;
  next();
});

module.exports = { reviewExist };
