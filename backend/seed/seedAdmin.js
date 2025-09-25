// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js"; // make sure this path is correct

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("✅ Admin already exists:", existingAdmin.email);
      process.exit();
    }

    // Create admin with plain password (Mongoose will hash it)
    const adminUser = new User({
      name: "Admin",
      email: "admin@example.com",
      password: "Admin@123", // plain password
      role: "admin",
    });

    await adminUser.save();
    console.log("✅ Admin user created:", adminUser.email);

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
