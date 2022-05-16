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

const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;
  await review.update({ comment, rating });
  res.status(200).json({ status: 'success' });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  await review.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
