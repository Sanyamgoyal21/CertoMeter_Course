const express = require('express');
const { createOrder, verifyPayment, getOrders } = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.get('/orders', getOrders);

module.exports = router;
