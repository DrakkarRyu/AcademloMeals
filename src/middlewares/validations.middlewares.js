const { body, validationResult } = require('express-validator');

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password can not be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const createRestaurantValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address')
    .notEmpty()
    .withMessage('Address cannot be empty')
    .isLength({ min: 10 })
    .withMessage('Address must be at least 10 characters long'),
  body('rating')
    .notEmpty()
    .withMessage('rating can not be empty')
    .isInt({ min: 1, max: 5 })
    .withMessage('rating must be a number from 1 to 5'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    const errorMsg = messages.join('. ');

    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }

  next();
};

module.exports = {
  createUserValidations,
  createRestaurantValidations,
  checkValidations,
};
