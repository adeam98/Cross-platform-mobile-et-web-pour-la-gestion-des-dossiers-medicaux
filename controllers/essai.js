const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === 'ilyas' && password === '1234') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
};

module.exports = { login };

