const express = require('express');

// middlewares
const { userExist } = require('../middlewares/user.middlewares');
const { orderExist } = require('../middlewares/order.middlewares');
const {
  protectToken,
  protectAccountOwner,
} = require('../middlewares/user.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
// controllers
const {
  createNewUser,
  getAllUsers,
  login,
  updateUser,
  deleteUser,
  getOrders,
  getOrdersById,
} = require('../controllers/user.controller');

const router = express.Router();

// petitions
router.post('/signup', createUserValidations, checkValidations, createNewUser);
router.post('/login', login);

//protect token start here
router.use(protectToken);

router.get('/', getAllUsers);
router.patch('/:id', userExist, protectAccountOwner, updateUser);
router.delete('/:id', userExist, protectAccountOwner, deleteUser);
router.get('/orders', orderExist, getOrders);
router.get('/orders/:id', orderExist, getOrdersById);

module.exports = { userRouter: router };
