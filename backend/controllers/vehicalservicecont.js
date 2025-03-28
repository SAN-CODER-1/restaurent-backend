// controllers/userController.js
const User = require('../models/user');

const updatevehicalDetails = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the JWT token
    const { vehicleType, serviceType } = req.body;

    // Validate input
    if (!vehicleType || !serviceType) {
      return res.status(400).json({ message: 'Vehicle type and service type are required' });
    }

    // Find and update the user's car details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { vehicleType, serviceType },
      { new: true } // Return the updated user
    );

    res.status(200).json({
      message: 'Car details updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating car details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { updatevehicalDetails };