import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import CustomerCard from "../components/CustomerCard";

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
    if (!confirm("Delete this customer?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/customers/${id}`, {
        headers: { "x-auth-token": token },
      });
      fetch();
    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="centered">
      <div className="card-wrapper">
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
    </div>
  );
}
