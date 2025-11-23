import React from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Edit2, Trash2 } from "lucide-react";

export default function CustomerCard({ customer, onDelete }) {
  return (
    <div className="customer-card">
      {/* Header with avatar */}
      <div className="customer-header">
        <div className="avatar">
          <User size={20} />
        </div>
        <h3>{customer.name}</h3>
      </div>

      {/* Email + Phone */}
      <div className="customer-info">
        <p>
          <Mail size={16} />
          {customer.email || "—"}
        </p>
        <p>
          <Phone size={16} />
          {customer.phone || "—"}
        </p>
      </div>

      {/* Actions */}
      <div className="customer-actions">
        <Link to={`/customers/edit/${customer.id}`} className="action edit">
          <Edit2 size={16} /> Edit
        </Link>

        <button className="action delete" onClick={() => onDelete(customer.id)}>
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
