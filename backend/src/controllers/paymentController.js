import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import Product from "../models/Product.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // harcoded for development

// Create Stripe checkout session
export const createStripeSession = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Fetch full product info to ensure price accuracy
    const line_items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product not found: ${item.productId}`);

        return {
          price_data: {
            currency: "pkr",
            product_data: {
              name: product.name,
              images: [product.images?.[0] || ""],
            },
            unit_amount: product.price * 100, // Stripe uses cents
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        userId: req.user._id.toString(),
        cart: JSON.stringify(cartItems),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Session Error:", error);
    res.status(500).json({ message: "Stripe error", error: error.message });
  }
};
