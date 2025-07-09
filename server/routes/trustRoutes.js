const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const News = require("../models/News");

router.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});
router.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch {
    res.status(404).json({ message: "Event not found" });
  }
});

// News routes
router.get("/news", async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error: error.message });
  }
});

router.get("/news/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error: error.message });
  }
});

module.exports = router;
