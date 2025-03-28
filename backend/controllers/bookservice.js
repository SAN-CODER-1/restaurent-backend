const Booking = require('../models/booking');

// Book a service
const bookService = async (req, res) => {
  const { garageId, vehicleType, serviceType, userLocation, userName } = req.body;

  try {
    const booking = new Booking({
      garageId,
      vehicleType,
      serviceType,
      userLocation: {
        type: 'Point',
        coordinates: [userLocation.longitude, userLocation.latitude],
      },
      userName,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful!', booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book service', error });
  }
};
module.exports={bookService}