const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';
// controllers/garageController.js
const Garage = require('../models/garage');
const express = require('express');
// Assuming you have a Garage model


const router = express.Router();

// Register a new garage
const registerGarage= async (req, res) => {
  const { garageName, ownerName, email, rank, latitude, longitude, serviceType, password } = req.body;

  try {
    // Create a new garage
    const garage = new Garage({
      garageName,
      ownerName,
      email,
      rank,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude], // GeoJSON format: [longitude, latitude]
      },
      serviceType,
      password, // Note: Password should be hashed before saving
    });

    // Save the garage to the database
    await garage.save();

    res.status(201).json({ message: 'Garage registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register garage', error: error.message });
  }
};

module.exports = router;

// controllers/garageController.js

const loginGarage = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration
    );

    // Send the token and user data to the client
    res.status(200).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed. Please try again.', error });
  }
};

module.exports = { loginGarage,registerGarage };