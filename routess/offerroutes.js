const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offercontroller.js");

router.post("/", offerController.createOffer);
router.get("/", offerController.getOffers);
router.delete("/:id", offerController.deleteOffer);

module.exports = router;
