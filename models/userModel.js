import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    address: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);