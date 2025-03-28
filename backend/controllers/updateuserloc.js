// controllers/userController.js
const User = require('../models/user');

const updateUserLocation = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the JWT token
    const { latitude, longitude } = req.body;

    // Validate input
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // Find the user by ID and update their location
    const user = await User.findByIdAndUpdate(
      userId,
      { latitude, longitude },
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user's location
    res.status(200).json({
      message: 'User location updated successfully',
      location: {
        latitude: user.latitude,
        longitude: user.longitude,
      },
    });
  } catch (error) {
    console.error('Error updating user location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { updateUserLocation };