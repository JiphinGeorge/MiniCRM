import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
    <div className="centered">
      <div className="card-wrapper">
        <div className="card">
          <h2>Login</h2>
          <form onSubmit={submit} className="form">
            <label>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label>Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {err && <div className="error">{err}</div>}

            <button className="btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
