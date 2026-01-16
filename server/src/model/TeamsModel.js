import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Your name is Required"],
    },
    email: {
      type: String,
      required: true,
    },
    experience: {
      type: Number || String,
      required: true,
      default: 1,
    },
    handle: {
      type: Array || [String],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "passed"],
      default: "active",
    },
    role: {
      type: String,
      required: true,
      enum: ["CEO", "manager", "chief", "caterer", "worker", "seller"],
      default: "worker",
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TeamsModel = mongoose.model("workers", TeamSchema);

export default TeamsModel;
