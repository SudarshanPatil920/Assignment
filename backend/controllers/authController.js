import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

//register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, role });

  if (user) {
    const token = generateToken(user._id, user.role);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("➡️ Login attempt:", email, password);

  const user = await User.findOne({ email });
  if (!user) {
    console.log("❌ User not found in DB");
  } else {
    const isMatch = await user.matchPassword(password);
    console.log("Password match:", isMatch);
  }

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id, user.role);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


// Logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  }).json({ message: "Logged out" });
});
