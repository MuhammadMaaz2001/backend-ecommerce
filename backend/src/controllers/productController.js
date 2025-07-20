import Product from '../models/Product.model.js';

// @desc    Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock, description } = req.body;

    
    const images = req.files?.map(file => `/uploads/${file.filename}`) || [];

    const product = await Product.create({
      name,
      price,
      category,
      stock,
      description,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// @desc    Update product
// @desc    Update product
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock, description } = req.body;

    // Check if new images are uploaded
    const newImages = req.files?.map(file => file.path) || [];

    // Build updated data object
    const updatedData = {
      name,
      price,
      category,
      stock,
      description,
    };


    if (newImages.length > 0) {
      updatedData.images = newImages;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {  
    next(err);
  }
};


// @desc    Delete product
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};



// @desc    Add a review to a product
export const addProductReview = async (req, res, next) => {
  try {
    const { comment, rating } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Prevent duplicate review from same user
    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed by this user' });
    }

    const review = {
      user: req.user._id,
      comment,
      rating: Number(rating),
    };

    product.reviews.push(review);

    // Optional: update average rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all reviews of a product
export const getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name');

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product.reviews);
  } catch (err) {
    next(err);
  }
};
