import Product from '../models/Product.model.js';

// @desc    Get all products
// export const getAllProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     next(err);
//   }
// };

// In productController.js
export const getAllProducts = async (req, res) => {
  try {
    const { search = "", category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    
    const filter = {
      name: { $regex: search, $options: "i" },
    };
    if (category) filter.category = category;
    if (minPrice && maxPrice) filter.price = { $gte: minPrice, $lte: maxPrice };

    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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


export const getCategories = async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
};
