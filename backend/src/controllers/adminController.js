import User from "../models/User.model.js";
import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Get all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

// Update any product
export const updateProductByAdmin = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const product = await Product.findByIdAndUpdate(id, update, { new: true });
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Product updated", product });
};

// Delete any product
export const deleteProductByAdmin = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Product deleted" });
};

// Dashboard summary
export const getDashboardSummary = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalRevenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);
  const totalRevenue = totalRevenueAgg[0]?.total || 0;

  res.json({
    totalUsers,
    totalOrders,
    totalRevenue,
  });
};
