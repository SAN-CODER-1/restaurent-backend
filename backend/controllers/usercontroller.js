// controllers/userController.js
const User = require('../models/user');

const getUserData = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from the JWT token

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user's data
        res.status(200).json({
            message: 'User data retrieved successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                latitude: user.latitude,
                longitude: user.longitude,
            },
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getUserData };