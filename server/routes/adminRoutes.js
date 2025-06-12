const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Event = require("../models/Event");
const upload = require("../middleware/upload");

// ✅ Middleware for protected routes
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

// ✅ Admin Registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashed });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});

// ✅ Add new event (with auth + image upload)
router.post("/add-event", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newEvent = new Event({ title, image, date, description });
    await newEvent.save();

    res.status(201).json({ message: "Event added successfully" });
  } catch (err) {
    console.error("Add Event Error:", err.message);
    res.status(500).json({ message: "Failed to add event" });
  }
});

module.exports = router;
