const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [{ type: String }], // Support multiple images
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  source: { type: String }, // Newspaper source
  category: { type: String, default: "General" },
});

module.exports = mongoose.model("News", newsSchema);
