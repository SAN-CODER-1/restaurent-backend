const express = require('express');
const { registerUser, loginUser } = require('../controllers/authcontrollers.js');
const { getUserData } = require('../controllers/usercontroller.js');
const { getUserLocation } = require('../controllers/userlocation.js');
const { bookService} = require('../controllers/bookservice.js');
// const { saveDeviceToken } = require('../controllers/tocken.js');
const { updateUserLocation } = require('../controllers/updateuserloc.js');
const { updatevehicalDetails } = require('../controllers/vehicalservicecont.js');
const authenticateUser = require('../midleware/authmiddleware.js');
const { findNearbyGarages } = require('../controllers/findgaragecont.js');

const router = express.Router();

// Route to find nearby garages
router.get('/nearby',authenticateUser, findNearbyGarages);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateUser,getUserData);
router.get('/:userId/location', authenticateUser, getUserLocation);
router.put('/location', authenticateUser, updateUserLocation);
router.put('/vehicleservices', authenticateUser, updatevehicalDetails);
router.post('/bookservice', authenticateUser, bookService); // Correct usage
// router.get('/bookservice', authenticateUser, BookService);


module.exports = router;