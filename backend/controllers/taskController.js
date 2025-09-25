import asyncHandler from "express-async-handler";
import Task from "../models/Task.js";

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({
    title,
    description,
    user: req.user._id,
  });
  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task && task.user.toString() === req.user._id.toString()) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user._id.toString()) {
    task.title = title || task.title;
    task.description = description || task.description;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error("Task not found or unauthorized");
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  console.log("User making request:", req.user); 
  console.log("Task ID to delete:", req.params.id);

  const task = await Task.findById(req.params.id);
  console.log("Task found:", task);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this task");
  }

  // Use deleteOne instead of remove
  await task.deleteOne();

  res.json({ message: "Task removed" });
});
