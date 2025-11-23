import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", phone:"", address:"", notes:"" });

  useEffect(()=>{
    const token = localStorage.getItem("token");
    api.get(`/customers/${id}`, { headers: { "x-auth-token": token } })
      .then(res => setForm(res.data[0] || res.data))
      .catch(()=> alert("Could not load customer"));
  }, [id]);

const submit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    await api.put(`/customers/${id}`, form, {
      headers: { "x-auth-token": token },
    });

    Swal.fire({
      title: "Updated",
      text: "Customer details updated successfully!",
      icon: "success",
      timer: 1300,
      showConfirmButton: false,
      background: "rgba(255,255,255,0.7)",
      backdrop: "rgba(0,0,0,0.3) blur(6px)",
      customClass: { popup: "glass-popup" },
    });

    setTimeout(() => navigate("/customers"), 1300);
  } catch {
    Swal.fire({
      title: "Error",
      text: "Update failed.",
      icon: "error",
      customClass: { popup: "glass-popup" },
    });
  }
};


  return (
    <div className="card">
      <h2>Edit Customer</h2>
      <form onSubmit={submit} className="form">
        <label>Name</label>
        <input required value={form.name || ""} onChange={e=>setForm({...form, name:e.target.value})} />
        <label>Email</label>
        <input value={form.email || ""} onChange={e=>setForm({...form, email:e.target.value})} />
        <label>Phone</label>
        <input value={form.phone || ""} onChange={e=>setForm({...form, phone:e.target.value})} />
        <label>Address</label>
        <input value={form.address || ""} onChange={e=>setForm({...form, address:e.target.value})} />
        <label>Notes</label>
        <textarea value={form.notes || ""} onChange={e=>setForm({...form, notes:e.target.value})} />
        <button className="btn">Update</button>
      </form>
    </div>
  );
}
