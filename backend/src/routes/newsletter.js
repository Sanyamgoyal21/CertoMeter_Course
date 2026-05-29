const express = require('express');
const validator = require('validator');
const { sendWelcomeEmail } = require('../services/emailService');
const Subscriber = require('../models/Subscriber');

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  try {
    const { email, source = 'footer' } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await Subscriber.findOne({ email: normalizedEmail });
    const alreadySubscribed = !!existing;

    if (!alreadySubscribed) {
      await Subscriber.create({ email: normalizedEmail, source });
      console.log(`New subscriber: ${normalizedEmail}`);
    }

    try {
      await sendWelcomeEmail(normalizedEmail);
      console.log(`Welcome email sent: ${normalizedEmail}`);
    } catch (error) {
      console.error('Welcome email failed:', error.message);
      return res.status(502).json({
        error: 'Subscribed, but the welcome email could not be sent. Please try again later.',
        details: process.env.NODE_ENV === 'production' ? undefined : error.message,
      });
    }

    res.json({
      success: true,
      message: alreadySubscribed
        ? "You're already subscribed! We sent the welcome email again."
        : 'Successfully subscribed to newsletter!',
    });
  } catch (error) {
    console.error('Newsletter subscribe error:', error.message);
    res.status(500).json({ error: 'Subscription failed. Please try again.' });
  }
});

router.get('/count', async (req, res) => {
  try {
    const count = await Subscriber.countDocuments({ isActive: true });
    res.json({ count });
  } catch {
    res.json({ count: 0 });
  }
});

// Get all subscribers (for sending future updates)
router.get('/list', async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ isActive: true })
      .select('email subscribedAt source')
      .sort({ subscribedAt: -1 });
    res.json({ subscribers, total: subscribers.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

module.exports = router;
