// src/index.js
import dotenv from "dotenv";
dotenv.config();


import app from './app.js';
import connectDB from './db/connect.js';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
