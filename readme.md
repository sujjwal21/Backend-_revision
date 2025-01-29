#Backend Revision
# Express Authentication with JWT, Refresh Tokens, and Blacklisting

## Overview
This project is a **Node.js Express** authentication system implementing **JWT-based authentication** with refresh tokens and blacklisting. It provides **user registration, login, logout, and token refresh** functionality using **MongoDB** as the database.

## Features
✅ User Registration & Login
✅ Secure Password Hashing (bcrypt)
✅ JWT-based Authentication (Access & Refresh Tokens)
✅ JWT Blacklisting for Revoked Tokens
✅ Refresh Token System for Session Continuation
✅ Middleware for Protecting Routes
✅ MongoDB Integration with Mongoose
✅ Environment Variables Management (dotenv)

---

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt, JWT Blacklisting
- **Environment Management**: dotenv

---

## Folder Structure
```
express-auth-jwt/
│── node_modules/
│── src/
│   │── config/
│   │   ├── db.js             # Database connection
│   │── models/
│   │   ├── User.js          # User model
│   │   ├── Blacklist.js     # Blacklist model
│   │── middleware/
│   │   ├── authMiddleware.js # Middleware for authentication
│   │── routes/
│   │   ├── authRoutes.js    # Auth routes
│   │── controllers/
│   │   ├── authController.js # Auth controller functions
│   │── utils/
│   │   ├── tokenUtils.js     # JWT token utilities
│   │── server.js             # Main server file
│── .env                      # Environment variables
│── package.json              # Dependencies & scripts
│── README.md                 # Documentation
```

---

## Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/express-auth-jwt.git
cd express-auth-jwt
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root and add the following:
```
MONGO_URI=your_mongodb_connection_string
ACCESS_SECRET=your_access_token_secret
REFRESH_SECRET=your_refresh_token_secret
PORT=3000
```

### 4️⃣ Start the Server
```sh
node src/server.js
```
_Server will run on **http://localhost:3000**_

---

## API Endpoints

### 📝 Authentication Routes
| Method | Endpoint          | Description            |
|--------|------------------|------------------------|
| POST   | `/auth/register` | Register a new user   |
| POST   | `/auth/login`    | Login and get tokens  |
| POST   | `/auth/logout`   | Logout and blacklist JWT |
| POST   | `/auth/refresh`  | Refresh expired token |

### 🔒 Protected Route
| Method | Endpoint         | Description               |
|--------|-----------------|---------------------------|
| GET    | `/protected`    | Access protected resource |

---

## Usage

### 1️⃣ Register a User
```sh
POST /auth/register
{
  "username": "testuser",
  "password": "password123"
}
```

### 2️⃣ Login to Get Tokens
```sh
POST /auth/login
{
  "username": "testuser",
  "password": "password123"
}
```
_Response:_
```json
{
  "accessToken": "<JWT_TOKEN>",
  "refreshToken": "<REFRESH_TOKEN>"
}
```

### 3️⃣ Access Protected Route (Requires JWT)
```sh
GET /protected
Headers: Authorization: Bearer <JWT_TOKEN>
```

### 4️⃣ Logout (Blacklist Token)
```sh
POST /auth/logout
Headers: Authorization: Bearer <JWT_TOKEN>
```

### 5️⃣ Refresh Token
```sh
POST /auth/refresh
Send Refresh Token in Cookies
```

---

## 🔥 Future Enhancements
- Implement Role-Based Access Control (RBAC)
- Add Email Verification for User Registration
- Integrate Redis for Efficient Token Blacklisting

---

## 🛠 Troubleshooting
- **MongoDB Connection Error?** Ensure the correct `MONGO_URI` in `.env`
- **Invalid Token?** Ensure token is passed in `Authorization` header
- **Blacklisted Token?** Refresh or re-login

---

## 📝 License
This project is licensed under the **MIT License**.

