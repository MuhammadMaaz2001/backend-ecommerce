import express from 'express'
import { createStripeSession } from '../controllers/paymentController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/create-checkout-session", protect, createStripeSession)

export default router;