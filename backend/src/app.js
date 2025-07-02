
import path from 'path';
import { fileURLToPath } from 'url';


import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));




// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
