MiniCRM

A clean, glassmorphic small CRM built with React (Vite) for the frontend and Express + MySQL for the backend.
Features modern UI (glassmorphism), authentication, customer CRUD, SweetAlert2 popups, and responsive card-based customer listing.


Table of contents

Demo

Features

Tech stack

Project structure

Requirements

Environment variables

Setup — Backend (Express + MySQL)

Setup — Frontend (React + Vite)

API Endpoints

Usage

Customizations & Tips

Roadmap / TODO

Contributing

License

Demo

This is a local project example. Run the backend and frontend locally (instructions below) to test.

Features

Login & registration (JWT-based)

Protected routes (dashboard, customers) in frontend

Add / Edit / Delete customers (CRUD)

SweetAlert2 glass-style confirmation & success popups

Glassmorphic UI (cards, navbar, forms)

Customer list presented as modern glass cards (4 per row on wide screens)

Responsive layout (optional responsive variant available)

Simple MySQL schema for users & customers

Tech stack

Frontend

React (Vite)

react-router-dom

lucide-react (icons)

sweetalert2 (modals)

Axios (api)

Backend

Node.js + Express

MySQL

bcrypt (password hashing)

jsonwebtoken (JWT)

Project structure (high level)
/frontend
  /src
    /components
      Navbar.jsx
      CustomerCard.jsx
    /pages
      Login.jsx
      Register.jsx
      Dashboard.jsx
      Customers.jsx
      AddCustomer.jsx
      EditCustomer.jsx
    styles.css
    api.js
    main.jsx
/backend
  /routes
    auth.js
    customers.js
  /middleware
    auth.js
  config
    db.js
  app.js (or server.js)
README.md

Requirements

Node.js (v16+ recommended)

npm or yarn

MySQL server

(Optional) Git

Environment variables

Create .env files for backend and frontend (if needed).

Backend (/backend/.env)

PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=mini_crm_db
JWT_SECRET=your_jwt_secret_here


Frontend (if using env variables) — e.g. /frontend/.env

VITE_API_URL=http://localhost:5000/api

Setup — Backend (Express + MySQL)

Open terminal, go to backend folder:

cd backend
npm install


Initialize database (example SQL):

CREATE DATABASE mini_crm_db;
USE mini_crm_db;

-- users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- customers table
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


Start backend:

# make sure .env is configured
npm run dev
# or
node app.js

Setup — Frontend (React + Vite)

Open terminal, go to frontend folder:

cd frontend
npm install


Make sure api.js points to backend API. Example api.js:

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export default api;


Start frontend:

npm run dev


Open http://localhost:5173 (or Vite's printed URL).

API Endpoints (example)

Prefix: /api

Auth

POST /auth/register — body: { name, email, password }

POST /auth/login — body: { email, password } → returns JWT token

Customers

GET /customers — header: x-auth-token: <token> — get all customers for user

GET /customers/:id — header token — get customer by id

POST /customers — header token — body: { name, email, phone, address, notes }

PUT /customers/:id — header token — update

DELETE /customers/:id — header token — delete

Usage

Register a new user via the Register page.

Login with the user; token is stored in localStorage.

Navigate to Customers — add/edit/delete customers.

Enjoy glass popups and modern UI.

Customizations & Tips

Cards per row: The frontend uses a CSS grid to set 4 cards per row. For responsive behavior, use auto-fit/minmax in .grid.

SweetAlert2 styles: Customize .glass-popup, .glass-confirm-btn, etc, in styles.css.

Auth token: Provided in x-auth-token header — middleware auth.js should verify JWT.

Deployment: Build frontend (npm run build) and serve static files with Express or host frontend separately (Vercel/Netlify).

Roadmap / TODO

Pagination & search for customers

CSV import/export of contacts

Upload avatar images for customers

Role-based access control (admin vs user)

Dark mode toggle

Contributing

Contributions are welcome!

Fork the repository

Create a feature branch (git checkout -b feat/your-feature)

Commit changes (git commit -m "feat: add ...")

Open a PR

Please follow existing code style. For UI changes, add screenshots to the PR.

Troubleshooting

If frontend complains about missing styles.css import, ensure src/styles.css exists and is imported from main.jsx.

If CORS errors appear: allow CORS in Express (npm install cors and app.use(cors())).

If DB connection fails: check .env credentials and MySQL service.

License

This project is provided as-is. Add your license (MIT/Apache/etc.) as needed.

Contact

Built by Jiphin George (project owner).
