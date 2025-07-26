import Order from '../models/Order.model.js';
import { sendEmail } from "../utils/sendEmail.js";

// @desc Create a new order
export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    const parsedItems = typeof orderItems === 'string' ? JSON.parse(orderItems) : orderItems;

    const order = await Order.create({
      user: req.user._id,
      orderItems: parsedItems,
      totalPrice,
    });

    const user = await User.findById(req.user._id);

    await sendEmail(
      user.email,
      "Order Placed Successfully",
      `Thank you for your order!\n\nOrder ID: ${order._id}\nTotal: $${order.totalPrice}\n\nWe'll notify you as your order progresses.`
    );

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// @desc Get current user's orders
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

// @desc Get single order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // allow only order owner to view
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await Order.findById(id).populate("user", "email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    await sendEmail(
      order.user.email,
      `Order Status Updated`,
      `Your order with ID ${order._id} is now marked as "${order.status}".\n\nThank you for shopping with us!`
    );

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
