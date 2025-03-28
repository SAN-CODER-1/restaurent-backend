// controllers/garageController.js
const Garage = require('../models/garage.js');
const calculateDistance = require('../utills/calculator.js'); // Helper function to calculate distance

const findNearbyGarages = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 10 } = req.query; // maxDistance in km (default: 10km)

    // Validate input
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // Convert latitude and longitude to numbers
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return res.status(400).json({ message: 'Invalid latitude or longitude values' });
    }

    // Find all garages
    const garages = await Garage.find({});

    // Calculate distance for each garage and filter by maxDistance
    const nearbyGarages = garages
      .map((garage) => {
        const distance = calculateDistance(
          lat,
          lon,
          garage.location.latitude,
          garage.location.longitude
        );
        return { ...garage.toObject(), distance };
      })
      .filter((garage) => garage.distance <= maxDistance);

    // Sort garages by rank (descending) and distance (ascending)
    nearbyGarages.sort((a, b) => {
      if (a.rank === b.rank) {
        return a.distance - b.distance; // Sort by distance if ranks are equal
      }
      return b.rank - a.rank; // Sort by rank
    });

    res.status(200).json({ garages: nearbyGarages });
  } catch (error) {
    console.error('Error finding nearby garages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { findNearbyGarages };