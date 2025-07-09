const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  images: [String], // Changed to array to support multiple images
  date: String,
  description: String,
});

module.exports = mongoose.model("Event", eventSchema);
