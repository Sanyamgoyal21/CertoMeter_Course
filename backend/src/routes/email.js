const express = require('express');
const validator = require('validator');
const { getEmailConfigStatus, sendTestEmail } = require('../services/emailService');

const router = express.Router();

router.get('/status', (req, res) => {
  res.json(getEmailConfigStatus());
});

router.post('/test', async (req, res) => {
  try {
    if (!process.env.EMAIL_TEST_TOKEN || req.get('x-email-test-token') !== process.env.EMAIL_TEST_TOKEN) {
      return res.status(404).json({ error: 'Route not found' });
    }

    const to = req.body?.to || process.env.EMAIL_TO;

    if (!to || !validator.isEmail(to)) {
      return res.status(400).json({ error: 'Set EMAIL_TO or provide a valid "to" email.' });
    }

    await sendTestEmail(to);
    res.json({ success: true, message: `Test email sent to ${to}` });
  } catch (error) {
    console.error('Email test failed:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
