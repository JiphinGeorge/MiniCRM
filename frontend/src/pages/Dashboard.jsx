import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api.get("/customers", { headers: { "x-auth-token": token } })
      .then(res => setCount(res.data.length))
      .catch(()=> setCount(0));
  }, []);

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p>Total customers: <strong>{count}</strong></p>
      <div style={{marginTop:16}}>
        <Link to="/customers" className="btn">View Customers</Link>
        <Link to="/customers/add" className="btn btn-outline" style={{marginLeft:8}}>Add Customer</Link>
      </div>
    </div>
  );
}
