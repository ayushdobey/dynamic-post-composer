# JWT Authentication and RBAC Lab

A full-stack experiment demonstrating registration, login, JWT sessions, protected routes, and Role-Based Access Control (RBAC).

## Folder structure

```
exp3/
├── client/                 # React user interface
│   └── src/
│       ├── api.js
│       ├── App.jsx
│       └── main.jsx
├── server/                 # Express API
│   └── src/
│       ├── config/db.js
│       ├── controllers/authController.js
│       ├── middleware/authMiddleware.js
│       ├── models/User.js
│       ├── routes/authRoutes.js
│       ├── routes/protectedRoutes.js
│       ├── seed.js
│       └── server.js
├── .env.example
└── package.json
```

## Setup

1. Install [Node.js 18+](https://nodejs.org/) and start MongoDB locally, or create a free MongoDB Atlas cluster.
2. Copy `.env.example` to `server/.env` and set values. (`Copy-Item .env.example server/.env` in PowerShell.)
3. Install packages from the project root:

```bash
npm install
npm run install:all
```

4. Seed the administrator, then run both applications:

```bash
npm run seed
npm run dev
```

Open `http://localhost:5173`. The API runs at `http://localhost:5000`.

## Environment variables

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/jwt_rbac_lab
JWT_SECRET=replace_with_a_long_random_secret_of_at_least_32_characters
JWT_EXPIRES_IN=1h
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Lab Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123
NODE_ENV=development
```

## API endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a User account and log in |
| POST | `/api/auth/login` | Public | Log in and receive a JWT cookie |
| POST | `/api/auth/logout` | Authenticated | Clear the session cookie |
| GET | `/api/auth/me` | Authenticated | Get current user |
| GET | `/api/user/dashboard` | User or Admin | Protected user resource |
| GET | `/api/admin/dashboard` | Admin only | Protected admin resource |
| GET | `/api/health` | Public | Health check |

For API clients, send either the HTTP-only `token` cookie (browser) or `Authorization: Bearer <JWT>` header.

## Testing procedure and expected results

1. Register a new account in the UI. It is assigned role `user`; the dashboard shows the user-only resource.
2. Click **Admin dashboard**. A user receives `403 Forbidden` and a clear message.
3. Log out; private dashboard requests receive `401 Authentication required`.
4. Log in with the seeded administrator credentials below. Both protected resources now display.

Sample credentials:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `Admin@123` |
| User | Create one through registration | Your chosen 8+ character password |

## Viva notes

**JWT authentication:** After successful login, the server signs a token containing the user ID and role with a secret. The browser stores it in an HTTP-only cookie, which JavaScript cannot read. On private requests, authentication middleware verifies its signature and expiry before attaching the user to the request.

**RBAC:** A role is a permission group. Here, every registered account has `user`, while the seeded account has `admin`. After authentication, authorization middleware checks `req.user.role`; the admin route permits only `admin`, returning `403` for an authenticated user without permission.

Security measures demonstrated: bcrypt password hashing, input validation, a strong secret in environment variables, HTTP-only/SameSite cookies, short token expiry, generic login errors, and no password hashes in API responses.
