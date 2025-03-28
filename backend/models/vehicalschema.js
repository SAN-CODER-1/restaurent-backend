// models/VehicleService.js
const mongoose = require('mongoose');

const vehicleServiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user
  vehicleType: { type: String, required: true },
  serviceType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('VehicleService', vehicleServiceSchema);