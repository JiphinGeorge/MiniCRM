import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          {/* ✔ FIXED: Redirect to login if no token */}
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <Customers />
              </PrivateRoute>
            }
          />

          <Route
            path="/customers/add"
            element={
              <PrivateRoute>
                <AddCustomer />
              </PrivateRoute>
            }
          />

          <Route
            path="/customers/edit/:id"
            element={
              <PrivateRoute>
                <EditCustomer />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
