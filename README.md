# 🛒 E-commerce Backend API

This is a RESTful API built using Node.js, Express.js, and MongoDB for an E-commerce platform. It supports full product management, user authentication, orders, and reviews.

 📦 Tech Stack

- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for image upload
- Form-Data support (not JSON-based)
- bcryptjs for password hashing

---

 📁 Folder Structure



backend/
├── src/
│   ├── controllers/       # All business logic (products, users, orders)
│   ├── db/                # MongoDB connection
│   ├── middleware/        # Auth & error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── utils/             # Token generator, upload config
│   ├── uploads/           # Image storage folder
│   ├── app.js             # Express app setup
│   ├── index.js           # Entry point
│   └── constants.js
├── .env
└── package.json



---

 🚀 Features

  Products
- Create, Read, Update, Delete products
- Supports single or multiple image uploads
- Get all reviews for a product

  Users
- Register & login via `form-data`
- Get current user profile
- JWT-based authentication

  Orders
- Create an order (send products + quantity via `form-data`)
- View logged-in user's orders

  Reviews
- Add 1 review per user per product
- View reviews on product detail

---

 🔐 Authentication

- JWT token is generated on login/register
- Secure protected routes via middleware
- Token passed via `Authorization: Bearer <token>`

---

 ⚙️ .env Configuration

Create a `.env` file in the `backend/` root:



PORT=5000
MONGO\_URI=mongodb://localhost:27017/ecommerceDB
JWT\_SECRET=your\_jwt\_secret\_key

`

---

 📦 Setup & Run

bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev
`

---

 🧪 API Testing

Use Postman or Thunder Client to test:

* All endpoints use `multipart/form-data`
* Authenticated routes require a valid JWT token

---

 📸 Image Uploads

* Uploads are saved to `/src/uploads/`
* Publicly accessible at: `http://localhost:5000/uploads/<filename>`

---

 📌 Future Plans

* Admin dashboard (manage users/orders)
* Payment integration (Stripe/PayPal)
* React frontend integration (in progress...)

---

 🧑‍💻 Author

Made with ❤️ by \Muhammad Maaz

