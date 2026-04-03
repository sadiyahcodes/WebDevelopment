const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  const user = new User({ username, password, role });
  user.save()
    .then(() => res.status(201).json({ message: 'User registered' }))
    .catch(err => res.status(400).json({ message: err.message }));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret');
      res.json({ token });
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;