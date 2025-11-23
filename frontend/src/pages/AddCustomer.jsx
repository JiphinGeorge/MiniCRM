import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AddCustomer() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", address:"", notes:"" });
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post("/customers", form, { headers: { "x-auth-token": token } });
      navigate("/customers");
    } catch (err) {
      alert("Add failed");
    }
  };

  return (
    <div className="card">
      <h2>Add Customer</h2>
      <form onSubmit={submit} className="form">
        <label>Name</label>
        <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <label>Email</label>
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <label>Phone</label>
        <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <label>Address</label>
        <input value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
        <label>Notes</label>
        <textarea value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
        <button className="btn">Save</button>
      </form>
    </div>
  );
}
