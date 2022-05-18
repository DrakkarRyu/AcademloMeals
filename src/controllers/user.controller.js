const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const jwt = require('jsonwebtoken');
//const dotenv = require('dotenv');

// bcrypt
const bcrypt = require('bcryptjs');

// utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

// HTTP functions
const createNewUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({
    newUser,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  res.status(201).json({
    users,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: 'active' } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }

  // JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(201).json({
    status: 'sucess',
    token,
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  res.status(201).json({
    status: 'sucess',
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
  });
});

const getOrders = catchAsync(async (req, res, next) => {
  const order = await Order.findAll({
    include: [
      {
        model: Restaurant,
      },
    ],
  });
  res.status(201).json({
    order,
  });
});

const getOrdersById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  res.status(200).json({
    order,
  });
});

module.exports = {
  createNewUser,
  getAllUsers,
  login,
  updateUser,
  deleteUser,
  getOrders,
  getOrdersById,
};
