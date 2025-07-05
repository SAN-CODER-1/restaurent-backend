const User = require('./models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    req.session.user = user;
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
};
