import express from 'express';
import upload from '../utils/upload.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, upload.none(), createOrder);       // form-data
router.get('/my', protect, getMyOrders);                     // current user's orders
router.get('/:id', protect, getOrderById);                   // one order

export default router;
