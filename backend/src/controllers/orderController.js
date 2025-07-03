import Order from '../models/Order.model.js';

// @desc Create a new order
export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    // parse stringified array if needed
    const parsedItems = typeof orderItems === 'string' ? JSON.parse(orderItems) : orderItems;

    const order = await Order.create({
      user: req.user._id,
      orderItems: parsedItems,
      totalPrice,
    });

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
