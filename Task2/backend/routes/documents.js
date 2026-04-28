const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const Document = require('../models/Document');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({ storage: multer.memoryStorage() });

// Upload document
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  const { filename } = req.body;
  const file = req.file;
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `${Date.now()}-${filename}`,
    Body: file.buffer,
    ContentType: file.mimetype
  };
  try {
    const uploadResult = await s3.upload(params).promise();
    const doc = new Document({
      filename,
      uploaderId: req.user.id,
      s3Key: uploadResult.Key
    });
    await doc.save();
    res.json({ message: 'Uploaded', doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get documents
router.get('/', auth, async (req, res) => {
  const docs = await Document.find({ uploaderId: req.user.id });
  res.json(docs);
});

// Save signature
router.put('/:id/signature', auth, async (req, res) => {
  const { signature } = req.body;
  await Document.findByIdAndUpdate(req.params.id, { signature });
  res.json({ message: 'Signature saved' });
});

module.exports = router;