const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already used' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields required' });
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

module.exports = router;
