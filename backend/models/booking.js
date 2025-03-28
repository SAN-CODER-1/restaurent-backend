const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  garageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Garage', required: true },
  vehicleType: { type: String, required: true },
  serviceType: { type: String, required: true },
  userLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
  userName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);