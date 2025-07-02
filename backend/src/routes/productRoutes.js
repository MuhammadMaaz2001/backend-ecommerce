import express from 'express';
import upload from '../utils/upload.js';

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
// Accept multipart/form-data
router.post('/', upload.array('images',5), createProduct);
router.put('/:id', upload.array('image',5), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
