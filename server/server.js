const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ⬇️ Import routes
const trustRoutes = require("./routes/trustRoutes");
const adminRoutes = require("./routes/adminRoutes"); // ✅ ADD THIS

// ⬇️ Use routes
app.use("/api", trustRoutes);
app.use("/api/admin", adminRoutes); // ✅ ADD THIS
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("Gujarat Kalyan Parishad API running!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
