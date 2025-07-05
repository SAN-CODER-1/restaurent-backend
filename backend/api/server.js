const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http'); // ✅ Vercel-compatible wrapper

const offerRoutes = require("../backend/routess/offerroutes.js");
const orderRoutes = require('../backend/routess/orderRoutes.js');

const app = express();

// MongoDB Connect (only once)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// CORS Config
app.use(cors({
  origin: process.env.APPLICATION_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json()); // Body parser

// Routes
app.post('/api/test', (req, res) => {
  res.json({ success: true });
});

app.use("/api/offers", offerRoutes);
app.use("/api/orders", orderRoutes);

// ✅ No app.listen() here
// ✅ Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
