const mongoose = require('mongoose');

const garageSchema = new mongoose.Schema({
  garageName: { type: String, required: [true, 'Garage name is required.'] },
  ownerName: { type: String, required: [true, 'Owner name is required.'] },
  email: { 
    type: String, 
    required: [true, 'Email is required.'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format.'],
  },
  rank: { 
    type: Number, 
    required: [true, 'Rank is required.'],
    min: [0, 'Rank cannot be less than 0.'],
    max: [5, 'Rank cannot exceed 5.'],
  },
  location: {
    type: { 
      type: String, 
      default: 'Point',
      enum: ['Point'], // Only allow 'Point' type
    },
    coordinates: { 
      type: [Number], 
      required: [true, 'Coordinates are required.'],
      validate: {
        validator: (value) => value.length === 2 && !isNaN(value[0]) && !isNaN(value[1]),
        message: 'Invalid coordinates.',
      },
    },
  },
  serviceType: { 
    type: String, 
    required: [true, 'Service type is required.'],
    enum: ['bike', 'car', 'big'], // Validate allowed values
  },
  password: { 
    type: String, 
    required: [true, 'Password is required.'],
    minlength: [6, 'Password must be at least 6 characters.'],
  },
});

garageSchema.index({ location: '2dsphere' }); // Geospatial index

module.exports = mongoose.model('Garage', garageSchema);