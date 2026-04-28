const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  scheduledAt: Date,
  duration: Number, // in minutes
  status: { type: String, enum: ['scheduled', 'accepted', 'rejected', 'completed'], default: 'scheduled' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);