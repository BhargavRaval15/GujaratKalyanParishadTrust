const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
require("dotenv").config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: "gkpofficial" });
    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash("gkprss", 10);
    const admin = new Admin({
      username: "gkpofficial",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin created successfully!");
    console.log("Username: gkpofficial");
    console.log("Password: gkprss");
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();