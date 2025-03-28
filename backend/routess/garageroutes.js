const express = require('express');
const {   registerGarage,loginGarage } = require('../controllers/garagecontoller.js');
const {   getBookingsForOwner } = require('../controllers/bookingforowner.js');
const authenticateUser = require('../midleware/authmiddleware.js');

const router = express.Router();

router.post('/putgarages', registerGarage);
router.get('/garagesbooking', authenticateUser, getBookingsForOwner);
router.post('/garagelogin',authenticateUser, loginGarage);

module.exports = router;