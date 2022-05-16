const { catchAsync } = require('../utils/catchAsync');
const { Review } = require('../models/review.model');

const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const newReview = await Review.create({
    comment,
    rating,
  });
  res.status(201).json({
    newReview,
  });
});

module.exports = { createReview };
