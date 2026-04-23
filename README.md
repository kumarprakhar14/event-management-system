<div align="center">

# 🗓️ Event Management System

**Created by Kumar Prakhar**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Now-4472c4?style=for-the-badge)](https://event-management-system-kappa-pearl.vercel.app/)

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcryptjs-004088?style=flat-square&logo=letsencrypt&logoColor=white)

A full-stack **Event Management System** built with the MERN stack. The system provides role-based portals for **Admins**, **Vendors**, and **Users** to manage events, products, orders, and guest lists.

</div>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Overview](#api-overview)
- [Role-Based Access](#role-based-access)
- [Database Models](#database-models)
- [File Uploads (Cloudinary)](#file-uploads-cloudinary)

---

## Features

### Admin Portal
- Manage Users (Create, View, Update, Delete)
- Manage Vendors (Create, View, Update, Delete, Toggle Active Status)
- Manage memberships for both Users and Vendors

### Vendor Portal
- Manage product catalog (Add, Edit, Delete items with image upload)
- View and update incoming orders by status
- View vendor-specific item requests submitted by users

### User Portal
- Browse active vendor listings (filterable by category)
- View vendor-specific product catalogs
- Shopping cart (Add, Update, Remove items)
- Checkout and place orders
- Track order status
- Submit custom item requests to a specific vendor
- Manage personal guest list (event name + attendee names)

### Authentication
- Separate login/signup flows for each role (`admin`, `vendor`, `user`)
- JWT-based stateless authentication with `30-day` token expiry
- bcrypt password hashing
- Session persistence via `localStorage` on the client

---

## Project Structure

```
event-management/
├── client/                         # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── api.js                  # Axios instance with auth interceptor
│   │   ├── context/
│   │   │   ├── AuthContext.jsx     # Global auth state (token, user, login, logout)
│   │   │   └── PrivateRoute.jsx    # Role-based route guard
│   │   ├── pages/
│   │   │   ├── IndexPage.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── VendorLogin.jsx
│   │   │   ├── VendorSignup.jsx
│   │   │   ├── UserLogin.jsx
│   │   │   ├── UserSignup.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── MaintainUser.jsx
│   │   │   │   └── MaintainVendor.jsx
│   │   │   ├── vendor/
│   │   │   │   ├── VendorDashboard.jsx
│   │   │   │   ├── VendorItems.jsx
│   │   │   │   ├── VendorProductStatus.jsx
│   │   │   │   ├── VendorUpdateOrder.jsx
│   │   │   │   └── VendorRequests.jsx
│   │   │   └── user/
│   │   │       ├── UserPortal.jsx
│   │   │       ├── VendorListing.jsx
│   │   │       ├── UserProducts.jsx
│   │   │       ├── UserCart.jsx
│   │   │       ├── UserCheckout.jsx
│   │   │       ├── OrderSuccess.jsx
│   │   │       ├── OrderStatus.jsx
│   │   │       ├── RequestItem.jsx
│   │   │       └── GuestList.jsx
│   │   ├── index.css               # Global stylesheet
│   │   └── App.jsx                 # Root router
│   ├── .env                        # Client environment variables
│   └── package.json
│
└── server/                         # Node.js + Express backend (ES Modules)
    ├── app.js                      # Express app (middleware + routes)
    ├── server.js                   # Startup (DB connect + seed + listen)
    ├── config/
    │   ├── env.js                  # Centralized env validation & config object
    │   └── cloudinary.js           # Cloudinary SDK initialization
    ├── db/
    │   └── db.js                   # Mongoose connection
    ├── scripts/
    │   └── seedAdmin.js            # Admin user seeder (runs on startup)
    ├── models/
    │   ├── User.js
    │   ├── Vendor.js
    │   ├── Product.js
    │   ├── Cart.js
    │   ├── Order.js
    │   ├── RequestItem.js
    │   └── GuestList.js
    ├── controllers/
    │   ├── authController.js
    │   ├── adminController.js
    │   ├── vendorController.js
    │   └── userController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── adminRoutes.js
    │   ├── vendorRoutes.js
    │   └── userRoutes.js
    ├── middleware/
    │   ├── authMiddleware.js        # JWT verification
    │   ├── roleMiddleware.js        # Role-based access control
    │   └── uploadMiddleware.js     # Multer + Cloudinary storage
    ├── .env                        # Server environment variables
    └── package.json
```

---

## Prerequisites

Ensure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) `v18+`
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud URI)
- A [Cloudinary](https://cloudinary.com/) account (free tier works)
- `npm` (comes with Node.js)

---

## Environment Variables

### Server (`server/.env`)

Create a file named `.env` inside the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/event-management
JWT_SECRET=your_super_secret_jwt_key_here

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **Note:** If any of the above variables are missing, the server will log a descriptive error and exit immediately before starting. This is enforced in `config/env.js`.

### Client (`client/.env`)

Create a file named `.env` inside the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SERVER_URL=http://localhost:5000
```

> **Note:** Vite requires all client-side variables to be prefixed with `VITE_`.

---

## Installation & Setup

**Step 1:** Clone the repository
```bash
git clone <repository-url>
cd event-management
```

**Step 2:** Install backend dependencies
```bash
cd server
npm install
```

**Step 3:** Install frontend dependencies
```bash
cd ../client
npm install
```

**Step 4:** Configure environment variables (see [Environment Variables](#environment-variables) above).

---

## Running the Application

Both the frontend and backend servers must be running simultaneously.

**Start the backend server** (from `server/` directory):
```bash
npm run start
```

**Start the frontend development server** (from `client/` directory):
```bash
npm run dev
```

The application will be available at:
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000/api`

On first startup, the backend automatically seeds a default Admin account:
| Field | Value |
|---|---|
| Email | `admin@event.com` |
| Password | `admin123` |

> **Important:** Change the admin credentials after your first login in a production environment.

---

## API Overview

All API routes are prefixed with `/api`.

### Authentication — `/api/auth`
| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/auth/admin/login` | Admin login | Public |
| POST | `/auth/vendor/login` | Vendor login | Public |
| POST | `/auth/vendor/signup` | Vendor registration | Public |
| POST | `/auth/user/login` | User login | Public |
| POST | `/auth/user/signup` | User registration | Public |

### Admin — `/api/admin`
| Method | Route | Description |
|---|---|---|
| GET | `/admin/users` | List all users |
| POST | `/admin/users` | Create a user |
| PUT | `/admin/users/:id` | Update a user |
| DELETE | `/admin/users/:id` | Delete a user |
| GET | `/admin/vendors` | List all vendors |
| POST | `/admin/vendors` | Create a vendor |
| PUT | `/admin/vendors/:id` | Update a vendor |
| DELETE | `/admin/vendors/:id` | Delete a vendor |

### Vendor — `/api/vendor`
| Method | Route | Description |
|---|---|---|
| GET | `/vendor/products` | List own products |
| POST | `/vendor/products` | Add a product (with image upload) |
| PUT | `/vendor/products/:id` | Update a product |
| DELETE | `/vendor/products/:id` | Delete a product |
| GET | `/vendor/orders` | View orders for this vendor |
| PUT | `/vendor/orders/:id/status` | Update order status |
| GET | `/vendor/requests` | View item requests sent to this vendor |

### User — `/api`
| Method | Route | Description |
|---|---|---|
| GET | `/vendors` | Browse active vendors |
| GET | `/vendors/:id/products` | View a vendor's products |
| GET/POST/PUT/DELETE | `/cart` | Manage shopping cart |
| POST | `/checkout` | Place an order |
| GET | `/orders` | View own orders |
| POST | `/requests` | Submit item request to a vendor |
| GET | `/requests` | View own submitted requests |
| GET/PUT | `/guest-list` | Manage personal guest list |

---

## Role-Based Access

The system enforces strict role-based access using two middleware layers:

1. **`authMiddleware`** — Verifies the JWT token from the `Authorization: Bearer <token>` header on every protected route.
2. **`roleMiddleware`** — Checks that the authenticated user's role matches the required role for that route.

```
Public Routes  → No middleware
Admin Routes   → authMiddleware + roleMiddleware('admin')
Vendor Routes  → authMiddleware + roleMiddleware('vendor')
User Routes    → authMiddleware + roleMiddleware('user')
```

On the client side, `PrivateRoute.jsx` wraps all protected pages. It reads the authenticated user's role from `AuthContext` and redirects unauthenticated users to the relevant login page.

---

## Database Models

| Model | Key Fields |
|---|---|
| `User` | `name`, `email`, `password` (hashed), `role` (admin/vendor/user), `membershipType`, `membershipStart`, `membershipEnd`, `isActive` |
| `Vendor` | `userId` (ref User), `businessName`, `category`, `contactDetails`, `isActive` |
| `Product` | `vendorId` (ref Vendor), `name`, `price`, `imageUrl`, `isAvailable` |
| `Cart` | `userId` (ref User), `items[]` → `{productId, quantity}` |
| `Order` | `userId`, `vendorId`, `items[]`, `totalAmount`, `shippingDetails`, `paymentMethod`, `status` |
| `RequestItem` | `userId` (ref User), `vendorId` (ref Vendor), `itemDescription`, `status` (Pending/Acknowledged/Fulfilled) |
| `GuestList` | `userId` (ref User), `eventName`, `guests[]` → `{name}` |

---

## File Uploads (Cloudinary)

Product images are handled using **Multer** with the **Cloudinary Storage** adapter (`multer-storage-cloudinary`). When a vendor uploads a product image:

1. The file is streamed directly to Cloudinary — no file is written to the local disk.
2. Cloudinary returns an absolute HTTPS URL which is stored in the `Product.imageUrl` field in MongoDB.
3. The frontend renders images using the stored absolute URL directly — no server proxying required.

All uploaded product images are stored in the Cloudinary folder: `event-management/products`.
