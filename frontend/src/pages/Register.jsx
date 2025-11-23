import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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
    <div className="centered">
      <div className="card-wrapper">
        <div className="card">
          <h2>Register</h2>
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
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {msg && <div className="info">{msg}</div>}

            <button className="btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
