const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

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

module.exports = router;
