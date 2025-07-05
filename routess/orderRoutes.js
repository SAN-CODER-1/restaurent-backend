const express = require('express');
const router = express.Router();
const odercontroller = require('../controllers/odercontroller.js');

router.post('/', odercontroller.createOrder);
router.get('/', odercontroller.getOrders);
router.delete("/:id", odercontroller.deleteOrder);
router.put("/:id", odercontroller.updateOrder);

module.exports = router;
