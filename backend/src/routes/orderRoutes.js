import express from 'express';
import upload from '../utils/upload.js';
import { protect , isAdmin } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, upload.none(), createOrder);       
router.get('/my', protect, getMyOrders);                     
router.get('/:id', protect, getOrderById);                   

router.patch("/update-status/:id", protect, isAdmin, updateOrderStatus);

export default router;
