const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hash],
      (err) => {
        if (err) return res.status(400).json({ msg: "User already exists" });
        res.json({ msg: "User registered" });
      }
    );
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (results.length === 0)
      return res.status(400).json({ msg: "Invalid credentials" });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

      const token = jwt.sign({ user: { id: user.id } }, "SECRET123");
      res.json({ token });
    });
  });
});

module.exports = router;
