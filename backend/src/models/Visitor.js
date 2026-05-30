const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  ipAddress: String,
  userAgent: String,
  referrer: String,
  country: String,
  pageViews: { type: Number, default: 1 },
  firstVisit: { type: Date, default: Date.now },
  lastSeen: { type: Date, default: Date.now },
});

visitorSchema.index({ firstVisit: -1 });

module.exports = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);
