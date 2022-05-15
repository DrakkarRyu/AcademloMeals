const express = require('express');

// middlewares
const { orderExist } = require('../middlewares/order.middlewares');

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
router.get('/me', orderExist, getOrders);

router
  .route('/:id')
  .patch(orderExist, updateOrder)
  .delete(orderExist, deleteOrder);

module.exports = { orderRouter: router };
