import express from 'express';
import upload from '../utils/upload.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
  getProductReviews
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
// Accept multipart/form-data
router.post('/', upload.array('images',5), createProduct);
router.put('/:id', upload.array('image',5), updateProduct);
router.delete('/:id', deleteProduct);

router.post('/:id/reviews',protect,upload.none(),addProductReview)
router.get('/:id/reviews',getProductReviews)

export default router;
