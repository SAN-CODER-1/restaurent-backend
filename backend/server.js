const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routess/authroutes.js');
const garageRoutes = require('./routess/garageroutes.js');
const admin = require('firebase-admin');
const serviceAccount = require('./config/wheels-a0893-firebase-adminsdk-fbsvc-e0a03076e4.json'); // Path to your service account key
 

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


// Add this at the top of server.js
 const mongoose = require('mongoose');

 mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch((err) => console.error('MongoDB connection error:', err));
// Initialize Firebase Admin SDK
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api', authRoutes);
app.use('/api', garageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});