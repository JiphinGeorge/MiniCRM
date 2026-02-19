# MiniCRM

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#license)  
*Simple glassmorphic customer‑relationship manager with React frontend and Express + MySQL backend.*

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
   * [Backend](#backend)
   * [Frontend](#frontend)
5. [API Reference](#api-reference)
6. [Usage](#usage)
7. [Support](#support)
8. [Contributing](#contributing)
9. [Maintainers](#maintainers)
10. [License](#license)

---

## Features

- **User authentication** (register/login) with JWT
- **Protected routes** in frontend (dashboard, customer pages)
- **Customer CRUD** operations scoped per user
- **Responsive glassmorphic UI** with SweetAlert2 modals
- Simple **MySQL schema** supporting multi‑user data

## Tech Stack

### Backend

- Node.js & Express
- MySQL (via `mysql2`)
- `bcryptjs` for password hashing
- `jsonwebtoken` for JWTs

### Frontend

- React (Vite)
- `react-router-dom` for navigation
- Axios for API calls
- `sweetalert2` & `lucide-react` for UI

## Prerequisites

- Node.js v16+ and npm or yarn
- MySQL server running locally
- (Optional) Git for version control

## Getting Started

Clone the repository and navigate into it:

```bash
git clone <your-repo-url>
cd MiniCRM
```

### Backend

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create the database and tables (adjust credentials as needed):
   ```sql
   CREATE DATABASE minicrm;
   USE minicrm;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE customers (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     name VARCHAR(255),
     email VARCHAR(255),
     phone VARCHAR(50),
     address TEXT,
     notes TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );
   ```
3. Set environment variables in `/backend/.env` (create this file):
   ```ini
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=1234
   DB_NAME=minicrm
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start   # or `node server.js`
   ```
The API will be available at `http://localhost:5000/api`.

### Frontend

1. Install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
2. (Optional) Configure API URL in `/frontend/.env`:
   ```ini
   VITE_API_URL=http://localhost:5000/api
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser (Vite will print the exact URL).

## API Reference

All endpoints are prefixed with `/api`.

### Auth

| Method | Endpoint           | Description                           | Body                        |
|--------|--------------------|---------------------------------------|-----------------------------|
| POST   | `/auth/register`   | Register a new user                   | `{ name, email, password }` |
| POST   | `/auth/login`      | Authenticate and receive JWT         | `{ email, password }`       |

### Customers (require `x-auth-token` header)

| Method | Endpoint                | Description                        | Body                        |
|--------|-------------------------|------------------------------------|-----------------------------|
| GET    | `/customers`            | List all customers for current user| —                           |
| GET    | `/customers/:id`        | Get a single customer by ID        | —                           |
| POST   | `/customers`            | Create new customer                | `{ name, email, phone, address, notes }` |
| PUT    | `/customers/:id`        | Update an existing customer        | same as POST body           |
| DELETE | `/customers/:id`        | Delete a customer                  | —                           |

## Usage

1. Register a new account via the **Register** page.
2. Log in; the JWT is stored in `localStorage` and used automatically for subsequent requests.
3. Navigate to **Dashboard** or **Customers** to add, edit, or remove contacts.

## Support

If you run into issues or have questions, please open an issue in the repository. You can also search existing issues for solutions. For quick clarifications, inspect the source files under `backend/` and `frontend/`.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines. In short:

1. Fork the project and create your feature branch (`git checkout -b feat/my-feature`).
2. Install dependencies and ensure the app runs.
3. Write clear, descriptive commits.
4. Open a pull request and describe your changes.

Feel free to add tests, improve documentation, or suggest new features.

## Maintainers

This project is maintained by **Jiphin George**. You can reach out via GitHub or by opening issues. Contributions are welcome!

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
