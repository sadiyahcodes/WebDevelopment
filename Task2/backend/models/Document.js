const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  filename: String,
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  s3Key: String,
  timestamp: { type: Date, default: Date.now },
  signature: String, // base64 image
});

module.exports = mongoose.model('Document', documentSchema);