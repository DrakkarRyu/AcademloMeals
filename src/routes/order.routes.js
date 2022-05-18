const express = require('express');

// middlewares
const { orderExist } = require('../middlewares/order.middlewares');
const { protectAccountOwner } = require('../middlewares/user.middlewares');

//controllers

const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');

const router = express.Router();

// petitions
router.post('/', createOrder);
//router.use();
router.get('/me', orderExist, getOrders);

router
  .route('/:id')
  .patch(orderExist, protectAccountOwner, updateOrder)
  .delete(orderExist, protectAccountOwner, deleteOrder);

module.exports = { orderRouter: router };
