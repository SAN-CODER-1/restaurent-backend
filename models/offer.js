const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  productId: { type: Number, ref: 'Product', required: true },
  discountPercent: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  image: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Offer', offerSchema);
