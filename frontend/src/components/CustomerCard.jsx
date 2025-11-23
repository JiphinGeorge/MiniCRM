import React from "react";
import { Link } from "react-router-dom";

export default function CustomerCard({ customer, onDelete }) {
  return (
    <div className="card card-sm">
      <h3>{customer.name}</h3>

      <p><strong>Email:</strong> {customer.email || "-"}</p>
      <p><strong>Phone:</strong> {customer.phone || "-"}</p>

      <div className="actions">
        <Link to={`/customers/edit/${customer.id}`} className="btn btn-sm">
          Edit
        </Link>

        <button
          onClick={() => onDelete(customer.id)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
