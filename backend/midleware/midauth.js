// controllers/authController.js
const jwt = require('jsonwebtoken');

exports.logins = async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials (e.g., check against database)
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
};