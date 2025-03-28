const Garage = require('../models/garage');

// Save device token for push notifications
exports.saveDeviceToken = async (req, res) => {
  const { token } = req.body;
  const garageId = req.user.id; // Assuming you have authentication middleware

  try {
    await Garage.findByIdAndUpdate(garageId, { deviceToken: token });
    res.status(200).json({ message: 'Token saved successfully' });
  } catch (error) {
    console.error('Error saving token:', error);
    res.status(500).json({ message: 'Failed to save token' });
  }
};