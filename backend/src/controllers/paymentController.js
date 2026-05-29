const Razorpay = require('razorpay');
const crypto = require('crypto');
const validator = require('validator');

const COURSE_AMOUNT = 599900; // ₹5,999 in paise
const COURSE_NAME = 'AI Career Accelerator';

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error('Razorpay keys not configured');
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

async function createOrder(req, res) {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Invalid email' });

    const razorpay = getRazorpay();
    const razorpayOrder = await razorpay.orders.create({
      amount: COURSE_AMOUNT,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { name, email, phone: phone || '' },
    });

    // Save order to DB
    try {
      const Order = require('../models/Order');
      await Order.create({
        razorpayOrderId: razorpayOrder.id,
        name: validator.escape(name.trim()),
        email: email.trim().toLowerCase(),
        phone: phone || '',
        amount: COURSE_AMOUNT,
      });
    } catch (dbErr) {
      console.error('Order DB save failed:', dbErr.message);
    }

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      courseName: COURSE_NAME,
      prefill: { name, email, contact: phone || '' },
    });
  } catch (error) {
    console.error('Create order error:', error.message);
    res.status(500).json({ error: 'Failed to create payment order. Please try again.' });
  }
}

async function verifyPayment(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment verification fields' });
    }

    // Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed. Invalid signature.' });
    }

    // Update order in DB
    try {
      const Order = require('../models/Order');
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: 'paid',
          paidAt: new Date(),
        },
        { new: true }
      );

      // Send payment confirmation email
      if (order) {
        const { sendPaymentConfirmation } = require('../services/emailService');
        sendPaymentConfirmation(order).catch(err =>
          console.error('Payment email failed:', err.message)
        );
      }
    } catch (dbErr) {
      console.error('Order update failed:', dbErr.message);
    }

    res.json({ success: true, message: 'Payment verified successfully! Welcome to the course.' });
  } catch (error) {
    console.error('Verify payment error:', error.message);
    res.status(500).json({ error: 'Payment verification failed.' });
  }
}

async function getOrders(req, res) {
  try {
    const Order = require('../models/Order');
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
    res.json({ orders, total: orders.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}

module.exports = { createOrder, verifyPayment, getOrders };
