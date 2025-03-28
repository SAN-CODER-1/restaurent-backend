const Booking = require('../models/booking');
const Garage = require('../models/garage');

// Fetch bookings for a garage owner
const getBookingsForOwner = async (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated or invalid token' });
    }

    const ownerId = req.user.id; // Get owner ID from the authenticated user

    // Find all garages owned by the user
    const garages = await Garage.find({ ownerId });

    if (garages.length === 0) {
      return res.status(404).json({ message: 'No garages found for this owner' });
    }

    // Get garage IDs
    const garageIds = garages.map(garage => garage._id);

    // Find bookings for these garages
    const bookings = await Booking.find({ garageId: { $in: garageIds } })
      .populate('garageId', 'garageName'); // Populate garage details

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

module.exports = { getBookingsForOwner }; // Correct export syntax