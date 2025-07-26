import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      name: String,
      quantity: Number,
      price: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },status: {
  type: String,
  enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
  default: "Pending",
},

  paidAt: Date,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
