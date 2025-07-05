const Offer = require("../models/offer.js");

exports.createOffer = async (req, res) => {
  try {
    const { productId, discountPercent, oldPrice, image, expiresAt } = req.body;
    const newPrice = oldPrice - (oldPrice * discountPercent) / 100;

    const offer = new Offer({
      productId,
      discountPercent,
      oldPrice,
      newPrice,
      image,
      expiresAt,
    });

    await offer.save();
    res.status(201).json({ message: "Offer created", offer });
  } catch (err) {
    res.status(500).json({ error: "Failed to create offer" });
  }
};

exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find()
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch offers" });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    await Offer.findByIdAndDelete(id);
    res.json({ message: "Offer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete offer" });
  }
};
