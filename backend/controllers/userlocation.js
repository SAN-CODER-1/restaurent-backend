// controllers/userController.js
const User = require('../models/user');

const getUserLocation = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's location
    res.status(200).json({
      message: 'User location retrieved successfully',
      location: {
        latitude: user.latitude,
        longitude: user.longitude,
      },
    });
  } catch (error) {
    console.error('Error fetching user location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getUserLocation };