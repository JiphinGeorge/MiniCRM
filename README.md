# MiniCRM

A clean, glassmorphic CRM application built with **React (Vite)**, **Express.js**, and **MySQL**.  
Includes authentication, customer management (CRUD), and modern UI with SweetAlert2 popups.

---

## 🚀 Features

- 🔐 Login & Registration (JWT Auth)
- 🛡 Protected pages (Dashboard, Customers)
- 👤 Add / Edit / Delete customers
- 🎨 Beautiful Glassmorphism UI
- 🧊 SweetAlert2 confirmation modals
- 📱 4-per-row customer card layout
- ⚡ Fast frontend using Vite
- 🗄 MySQL database storage

---

## 🛠 Tech Stack

### **Frontend**
- React (Vite)
- Axios
- React Router DOM
- SweetAlert2
- lucide-react (icons)

### **Backend**
- Node.js + Express
- MySQL
- JWT
- bcrypt

---

## 📁 Project Structure
image


---

## ⚙️ Installation & Setup

### **1️⃣ Backend Setup**

```bash
cd backend
npm install
```
## 📦 Database Setup

### **Create database**
```sql
CREATE DATABASE mini_crm_db;

USE mini_crm_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  address TEXT,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
## ⚙️ Environment Variables (`.env`)

Create a `.env` file inside the **backend** directory:
PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASS=yourpassword

DB_NAME=mini_crm_db

JWT_SECRET=your_secret


---

## ▶️ Run Backend Server

```bash
npm run dev

```
---
## 🖥 Frontend Setup
```bash
cd frontend
npm install
npm run dev

```
---
---

## 📡 API Base URL (Frontend)

Ensure your `api.js` contains the correct backend URL:

```js
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

```
---
---

## 🚀 Usage Guide

Once both servers are running:

1. **Register** a new account  
2. **Login** with your credentials  
3. Access the **Dashboard**  
4. Manage customers:  
   - ➕ Add Customer  
   - ✏️ Edit Customer  
   - ❌ Delete Customer  

Your session is protected using **JWT Authentication**.

---

## 📡 API Endpoints

### 🔐 Authentication
POST /auth/register → Register new user

POST /auth/login → Login & receive JWT token

### 👤 Customer Management

GET    /customers        → Fetch all customers  
GET    /customers/:id    → Get customer by ID  
POST   /customers        → Add a new customer  
PUT    /customers/:id    → Update a customer  
DELETE /customers/:id    → Delete a customer  

---

## 🧊 Screenshots

_Add your screenshots here:_

```md
![Screenshot 1](path/to/screenshot1.png)
![Screenshot 2](path/to/screenshot2.png)
```
---

## 🗺 Roadmap

- 🔍 Customer search functionality  
- 📊 Pagination for large customer lists  
- 📥 Import / Export CSV  
- 🖼 Profile avatars for customers  
- 🌙 Dark mode  
- 📈 Analytics & charts for dashboard  

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the repository  
2. Create a **new branch** (`feature/your-feature`)  
3. **Commit** your changes  
4. **Push** to your branch  
5. Create a **Pull Request**

---

## 📄 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project.

---

## 👤 Author

**Jiphin George**  
MiniCRM – A lightweight CRM built for learning & real-world usage.

---

