const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const offerRoutes = require("./routess/offerroutes.js");
const orderRoutes = require('./routess/orderRoutes.js'); // ✅ Import this

const app = express();
const PORT = 5000;

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Middleware
app.use(cors({
  origin: 'https://web0001-git-main-san638233-gmailcoms-projects.vercel.app/', // 👈 VITE port!
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json()); // 💉 Inject body parser middleware

// Routes

app.use("/api/offers", offerRoutes);
app.use('/api/orders', orderRoutes); // ✅ Mount this

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
