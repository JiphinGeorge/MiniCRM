import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";

export default function AddCustomer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post("/customers", form, {
        headers: { "x-auth-token": token },
      });

      Swal.fire({
        title: "Success",
        text: "Customer added successfully!",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
        background: "rgba(255,255,255,0.7)",
        backdrop: "rgba(0,0,0,0.3) blur(6px)",
        customClass: { popup: "glass-popup" },
      });

      // allow the popup to finish its animation before navigating
      setTimeout(() => navigate("/customers"), 1400);
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err?.response?.data?.msg || "Failed to add customer.",
        icon: "error",
        confirmButtonText: "OK",
        background: "rgba(255,255,255,0.9)",
        customClass: { popup: "glass-popup" },
      });
    }
  };

  return (
    <div className="centered">
      <div className="card-wrapper">
        <div className="card">
          <h2>Add Customer</h2>
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
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label>Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <label>Address</label>
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <label>Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <div style={{ marginTop: 8 }}>
              <button type="submit" className="btn">
                Save
              </button>
              <button
                type="button"
                className="btn-outline"
                style={{ marginLeft: 8 }}
                onClick={() =>
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    notes: "",
                  })
                }
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
