import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        {/* Brand goes to "/" (which auto redirects to login or dashboard) */}
        <Link to="/" className="brand">MiniCRM</Link>
      </div>

      <div className="nav-right">
        {token ? (
          <>
            {/* Home link for clarity */}
            <Link to="/dashboard">Home</Link>
            
            <Link to="/customers">Customers</Link>
            <button onClick={logout} className="btn-ghost">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
