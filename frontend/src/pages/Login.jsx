import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-bg">
      <div className="centered">
        <div className="card-wrapper">
          <div className="card auth-card">
            <h2 className="text-center">Login</h2>

            <form onSubmit={submit} className="form">
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

              {err && <div className="error">{err}</div>}

              <button className="btn">Login</button>
            </form>

            <Link to="/register" className="auth-link text-center">
              Don’t have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
