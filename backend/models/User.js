import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Hash password before saving (only if modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = process.env.NODE_ENV === "production" ? 10 : 6;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);

    // Debug log (remove in production)
    console.log("🔒 Password hashed for user:", this.email);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  // Debug log (remove in production)
  console.log(`Password match for ${this.email}:`, isMatch);
  return isMatch;
};

const User = mongoose.model("User", userSchema);
export default User;
