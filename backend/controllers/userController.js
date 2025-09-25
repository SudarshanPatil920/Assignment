import User from "../models/User.js";
import asyncHandler from "express-async-handler";

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password"); // exclude password
    res.json(users);
});

export const getMe = asyncHandler(async (req, res) => {
    const userId = req.user?._id; // req.user from your auth middleware
    if (!userId) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const user = await User.findById(userId).select("-password");
    res.json(user);
});