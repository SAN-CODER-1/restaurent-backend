const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const offerRoutes = require("../routess/offerroutes.js");   // ✅ FIXED PATH
const orderRoutes = require('../routess/orderRoutes.js');   // ✅ FIXED PATH

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors({
  origin: process.env.APPLICATION_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// ✅ Test route
app.get('/api/test', (req, res) => {
  res.json({ success: true });
});

// Routes
app.use("/api/offers", offerRoutes);
app.use("/api/orders", orderRoutes);

// Export for serverless
module.exports = app;
module.exports.handler = serverless(app);
