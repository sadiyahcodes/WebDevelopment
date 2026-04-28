const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  currency: { type: String, default: 'usd' },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  stripeSessionId: String,
  description: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);