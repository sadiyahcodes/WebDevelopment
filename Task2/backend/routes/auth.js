const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['investor', 'entrepreneur'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enable 2FA (mock)
router.post('/enable-2fa', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.twoFactorEnabled = true;
  user.twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString(); // Mock code
  await user.save();
  // In real, send via email/SMS
  res.json({ message: '2FA enabled. Code: ' + user.twoFactorCode });
});

// Verify 2FA (mock)
router.post('/verify-2fa', authMiddleware, async (req, res) => {
  const { code } = req.body;
  const user = await User.findById(req.user.id);
  if (user.twoFactorCode === code) {
    user.twoFactorCode = null;
    await user.save();
    res.json({ message: '2FA verified' });
  } else {
    res.status(400).json({ error: 'Invalid code' });
  }
});