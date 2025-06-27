const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const order = await Order.create({
    user: req.user._id,
    orderItems: req.body.orderItems,
    totalPrice: req.body.totalPrice,
  });
  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};
