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
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("Gujarat Kalyan Parishad API running!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("MongoDB connected to database:", mongoose.connection.name)
  )
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
