import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added Link here
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      setMsg("Registered. Redirecting to login...");
      setTimeout(() => navigate("/login"), 900);
    } catch (error) {
      setMsg(error?.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div className="auth-bg">
      <div className="centered">
        <div className="card-wrapper">
          <div className="card">
            <h2 className="text-center">Register</h2>

            <form onSubmit={submit} className="form">
              <label>Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <label>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁️"}
                </span>
              </div>

              {msg && <div className="info">{msg}</div>}

              <button className="btn">Register</button>
            </form>

            <Link to="/login" className="auth-link text-center">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
