import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import CustomerCard from "../components/CustomerCard";
import Swal from "sweetalert2";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [err, setErr] = useState("");

  const fetch = async () => {
    setErr("");
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/customers", {
        headers: { "x-auth-token": token },
      });
      setCustomers(res.data);
    } catch (error) {
      setErr("Could not fetch customers");
    }
  };

  const remove = async (id) => {
    Swal.fire({
      title: "Delete Customer?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      iconColor: "#e11d48",
      background: "rgba(255, 255, 255, 0.65)",
      backdrop: `
      rgba(0, 0, 0, 0.4)
      blur(6px)
    `,
      customClass: {
        popup: "glass-popup",
        confirmButton: "glass-danger-btn",
        cancelButton: "glass-cancel-btn",
      },
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const token = localStorage.getItem("token");
        await api.delete(`/customers/${id}`, {
          headers: { "x-auth-token": token },
        });

        Swal.fire({
          title: "Deleted",
          text: "Customer removed successfully.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
          background: "rgba(255,255,255,0.7)",
          backdrop: "rgba(0,0,0,0.3) blur(6px)",
          customClass: { popup: "glass-popup" },
        });

        fetch();
      } catch {
        Swal.fire({
          title: "Error",
          text: "Delete failed",
          icon: "error",
          background: "rgba(255,255,255,0.8)",
          customClass: { popup: "glass-popup" },
        });
      }
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Your Customers</h2>
        <Link to="/customers/add" className="btn">
          Add Customer
        </Link>
      </div>

      {err && <div className="card error">{err}</div>}

      <div className="grid">
        {customers.length === 0 && (
          <div className="card">No customers yet.</div>
        )}

        {customers.map((c) => (
          <CustomerCard key={c.id} customer={c} onDelete={remove} />
        ))}
      </div>
    </div>
  );
}
