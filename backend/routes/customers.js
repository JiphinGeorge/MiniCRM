const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth");

// ➤ Add customer
router.post("/", auth, (req, res) => {
  const { name, email, phone, address, notes } = req.body;

  db.query(
    "INSERT INTO customers (user_id, name, email, phone, address, notes) VALUES (?, ?, ?, ?, ?, ?)",
    [req.user.id, name, email, phone, address, notes],
    (err) => {
      if (err) return res.status(500).json({ msg: "Database error" });
      res.json({ msg: "Customer added" });
    }
  );
});

// ➤ Get all customers
router.get("/", auth, (req, res) => {
  db.query(
    "SELECT * FROM customers WHERE user_id = ? ORDER BY id DESC",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ msg: "Database error" });
      res.json(results);
    }
  );
});

// ➤ Get single customer by ID
router.get("/:id", auth, (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM customers WHERE id = ? AND user_id = ?",
    [id, req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ msg: "Database error" });
      res.json(results);
    }
  );
});

// ➤ Update customer
router.put("/:id", auth, (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, notes } = req.body;

  db.query(
    "UPDATE customers SET name=?, email=?, phone=?, address=?, notes=? WHERE id=? AND user_id=?",
    [name, email, phone, address, notes, id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ msg: "Database error" });
      res.json({ msg: "Customer updated" });
    }
  );
});

// ➤ Delete customer
router.delete("/:id", auth, (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM customers WHERE id = ? AND user_id = ?",
    [id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ msg: "Database error" });
      res.json({ msg: "Customer deleted" });
    }
  );
});

module.exports = router;
