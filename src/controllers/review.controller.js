const { catchAsync } = require('../utils/catchAsync');
const { Review } = require('../models/review.model');

const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { sessionUser } = req;
  const { id } = req.params;
  const newReview = await Review.create({
    comment,
    rating,
    userId: sessionUser.id,
    restaurantId: id,
  });
  res.status(201).json({
    newReview,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { sessionUser } = req;
  const { restaurant } = req;
  const { comment, rating } = req.body;

  await review.update({
    comment,
    rating,
    restaurantId: restaurant.id,
    userId: sessionUser.id,
  });

  res.status(200).json({ review, status: 'success' });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { sessionUser } = req;
  const { restaurant } = req;

  await review.update({
    status: 'deleted',
    restaurantId: restaurant.id,
    userId: sessionUser.id,
  });

  res.status(200).json({ review, status: 'success' });
});

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
