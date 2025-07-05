const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const offerRoutes = require("./routess/offerroutes.js");
const orderRoutes = require('./routess/orderRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000; // 👈 Hosting safe

// MongoDB Connect
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
app.use("/api/offers", offerRoutes);
app.use("/api/orders", orderRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

