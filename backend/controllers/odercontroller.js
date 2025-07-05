const Order = require('../models/orders');


exports.createOrder = async (req, res) => {
  try {

    const { customerName, items, totalAmount } = req.body;

    if (!customerName || !items || !totalAmount) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const order = new Order({
      customerName,
      items,
      totalAmount
    });

    await order.save();
    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated", order: updated });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

