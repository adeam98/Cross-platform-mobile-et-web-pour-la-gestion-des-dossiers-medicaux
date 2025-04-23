const express = require('express');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Welcome back!', user: req.user });
});

module.exports = router;
