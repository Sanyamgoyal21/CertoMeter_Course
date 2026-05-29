const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  razorpayOrderId: { type: String, required: true, unique: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date },
});

orderSchema.index({ email: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
