import express from 'express';
import upload from '../utils/upload.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getWishlist,
  toggleWishlist
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',upload.none(), registerUser); 
router.post('/login',upload.none() ,loginUser);       
router.get('/profile', protect, getUserProfile); 

router.get("/wishlist", protect, getWishlist);
router.post("/wishlist/:productId", protect, toggleWishlist);

export default router;
