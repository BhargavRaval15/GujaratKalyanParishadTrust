const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Event = require("../models/Event");
const News = require("../models/News");
const upload = require("../middleware/upload");

// ✅ Auth Middleware
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
};

// ✅ Register Admin
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await Admin.findOne({ username });
    if (exists)
      return res.status(400).json({ message: "Username already exists" });

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
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, admin: { id: admin._id, username: admin.username } });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Protected route (Add Event)
router.post("/add-event", auth, upload.array("images", 10), async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const newEvent = new Event({ 
      title, 
      images, 
      date, 
      description 
    });
    await newEvent.save();

    res.status(201).json({ message: "Event added successfully", event: newEvent });
  } catch (err) {
    console.error("Add Event Error:", err.message);
    res.status(500).json({ message: "Failed to add event" });
  }
});

// ✅ Protected route (Delete Event)
router.delete("/events/:id", auth, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete Event Error:", err.message);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

// ✅ Protected route (Add News)
router.post("/add-news", auth, upload.array("images", 10), async (req, res) => {
  try {
    const { title, description, source, category } = req.body;
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const newNews = new News({ 
      title, 
      images, 
      description, 
      source, 
      category 
    });
    await newNews.save();

    res.status(201).json({ message: "News added successfully", news: newNews });
  } catch (err) {
    console.error("Add News Error:", err.message);
    res.status(500).json({ message: "Failed to add news" });
  }
});

// ✅ Protected route (Get All News for Admin)
router.get("/news", auth, async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    console.error("Get News Error:", err.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

// ✅ Protected route (Update News)
router.put("/news/:id", auth, upload.array("images", 10), async (req, res) => {
  try {
    const { title, description, source, category } = req.body;
    const updateData = { title, description, source, category };
    
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json({ message: "News updated successfully", news: updatedNews });
  } catch (err) {
    console.error("Update News Error:", err.message);
    res.status(500).json({ message: "Failed to update news" });
  }
});

// ✅ Protected route (Delete News)
router.delete("/news/:id", auth, async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    
    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json({ message: "News deleted successfully" });
  } catch (err) {
    console.error("Delete News Error:", err.message);
    res.status(500).json({ message: "Failed to delete news" });
  }
});

module.exports = router;
