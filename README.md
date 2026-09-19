# 🛍️ The LUCII Store

An end-to-end full-stack E-Commerce web application inspired by modern lifestyle retail platforms[cite: 1, 4]. Built using the **MERN** stack (MongoDB, Express.js, Vanilla JS / HTML5 / CSS3, Node.js) with integrated **JWT Authentication**, **Google OAuth 2.0**, and complete **Cart/Product Management**[cite: 1, 4].

---

## 🚀 Live Demo

- **Frontend Application:** [https://the-lucii-store-frontend.onrender.com](https://the-lucii-store-frontend.onrender.com)  
- **Backend API:** [https://the-lucii-store.onrender.com](https://the-lucii-store.onrender.com)

---

## ✨ Features

### 👤 User & Authentication
- **Traditional Auth:** User registration and login using encrypted passwords with `bcrypt`[cite: 4].
- **Google OAuth 2.0:** One-click Google sign-in via Passport.js and Google Cloud API[cite: 1, 4].
- **Session & Security:** Secure JWT (JSON Web Token) generation with client-side session persistence[cite: 1, 4].
- **Token Validation:** Real-time token authentication guard to verify session states across navigation[cite: 1, 4].

### 🛒 Product Catalog & Shopping Cart
- **Product Exploration:** Browse products categorized across Men, Women, Accessories, etc[cite: 1, 4].
- **Search & Filters:** Dynamic product listing with price/category sorting and detailed item views[cite: 1, 4].
- **Cart Operations:** Add-to-cart, remove items, quantity adjustments, and dynamic subtotal calculations[cite: 1, 4].
- **Badge Counter:** Real-time cart item count sync across the navbar[cite: 1, 4].

### 🛠️ Admin Dashboard
- **Product Management:** Add new inventory, update pricing/specifications, and remove products[cite: 1, 4].
- **Metrics View:** High-level summary of store listings and user activity[cite: 1, 4].

---

## 🛠️ Tech Stack

### Frontend
- **HTML5 & CSS3** (Responsive design, CSS Grid, Flexbox)[cite: 1, 4]
- **Vanilla JavaScript (ES6+)**[cite: 1, 4]
- **FontAwesome & Custom Icons**[cite: 1, 4]

### Backend
- **Node.js** & **Express.js**[cite: 1, 4]
- **MongoDB & Mongoose ODM**[cite: 1, 4]
- **Passport.js & Passport-Google-OAuth20**[cite: 1, 4]
- **JSON Web Tokens (`jsonwebtoken`)**[cite: 1, 4]
- **Bcrypt** for secure hashing[cite: 4]
- **CORS** for cross-origin resource sharing[cite: 4]

---

## 📁 Repository Structure

```text
The-LUCII-Store/
├── backend/
│   ├── config/
│   │   └── db.js                        # MongoDB connection setup
│   ├── middlewares/
│   │   └── authenticator.middleware.js  # JWT validation middleware
│   ├── models/
│   │   ├── cart.model.js                # Cart schema
│   │   ├── products.model.js            # Product schema
│   │   └── users.model.js               # User schema
│   ├── oauths/
│   │   └── google.oauth.js              # Google OAuth 2.0 Passport strategy
│   ├── routes/
│   │   ├── carts.routes.js              # Cart endpoints
│   │   ├── products.routes.js           # Product endpoints
│   │   └── user.routes.js               # Auth endpoints (register, login)
│   ├── index.js                         # Server entry point & OAuth callback
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── admin/
    │   └── landing.html                 # Admin dashboard
    ├── scripts/
    │   ├── index.js                     # Login/Register script
    │   ├── main.js                      # Home & banner logic
    │   ├── navandfooter.js              # Navbar, footer & auth state listener
    │   └── cart.js                      # Cart operations
    ├── index.html                       # Landing / Login & Signup page
    ├── main.html                        # Product home
    ├── allproducts.html                 # Catalog listing
    ├── cart.html                        # User checkout & cart
    └── img/                             # Assets and banners
