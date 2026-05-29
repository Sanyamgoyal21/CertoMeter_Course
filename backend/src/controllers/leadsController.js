const validator = require('validator');
const { sendLeadNotification, sendContactConfirmation } = require('../services/emailService');

// In-memory fallback if MongoDB is unavailable
const leadsMemory = [];

async function submitLead(req, res) {
  try {
    const { name, email, phone, message, source = 'contact', utm = {} } = req.body;

    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Invalid email address' });
    if (name.length > 100) return res.status(400).json({ error: 'Name too long' });

    const leadData = {
      name: validator.escape(name.trim()),
      email: email.trim().toLowerCase(),
      phone: phone ? validator.escape(phone.trim()) : undefined,
      message: message ? validator.escape(message.trim().slice(0, 1000)) : undefined,
      source,
      utmSource: utm.source,
      utmMedium: utm.medium,
      utmCampaign: utm.campaign,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      createdAt: new Date(),
    };

    try {
      const Lead = require('../models/Lead');
      const lead = new Lead(leadData);
      await lead.save();
    } catch {
      leadsMemory.push(leadData);
    }

    // Send emails (non-blocking)
    sendContactConfirmation(leadData).catch(err =>
      console.error('Confirmation email failed:', err.message)
    );
    sendLeadNotification(leadData).catch(err =>
      console.error('Lead notification email failed:', err.message)
    );

    res.status(201).json({ success: true, message: "We'll be in touch soon!" });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ error: 'Failed to submit. Please try again.' });
  }
}

async function getLeads(req, res) {
  try {
    const Lead = require('../models/Lead');
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(100);
    res.json({ leads, total: leads.length });
  } catch {
    res.json({ leads: leadsMemory.slice(-100), total: leadsMemory.length });
  }
}

module.exports = { submitLead, getLeads };
