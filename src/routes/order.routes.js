const express = require('express');

// middlewares
const { orderExist } = require('../middlewares/order.middlewares');
const {
  protectAccountOwner,
  protectToken,
} = require('../middlewares/user.middlewares');

//controllers

const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');

const router = express.Router();

//protect token start here
router.use(protectToken);

// petitions
router.post('/', createOrder);
router.get('/me', getOrders);

router
  .route('/:id')
  .patch(orderExist, protectAccountOwner, updateOrder)
  .delete(orderExist, protectAccountOwner, deleteOrder);

module.exports = { orderRouter: router };
