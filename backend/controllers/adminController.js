import User from "../models/User.js";
import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";

// Get all users (admin only, exclude passwords)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

// Get all tasks (admin only)
export const getAdminTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({}).populate("user", "name email"); // optional: include user info
  res.json(tasks);
});

// Get stats for admin dashboard
export const getAdminStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalTasks = await Task.countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const activeToday = await Task.countDocuments({ createdAt: { $gte: today } });

  res.json({ totalUsers, totalTasks, activeToday });
});

// Delete a task by ID (admin only)
export const deleteAdminTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await Task.deleteOne({ _id: task._id }); // Proper way to delete a document
  res.json({ message: "Task deleted successfully" });
});
