const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 255 },
  phone: { type: String, trim: true, maxlength: 20 },
  message: { type: String, trim: true, maxlength: 1000 },
  source: { type: String, enum: ['contact', 'newsletter', 'cta', 'whatsapp'], default: 'contact' },
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  ipAddress: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
});

leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
