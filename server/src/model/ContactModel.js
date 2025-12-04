import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Your name is Required"],
    },
    userInfo: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String || Number,
      required: true,
    },
    contactedBy: {
      type: String, //   required: true,
      ref: "users",
    },
    updatedBy: {
      type: String,
      required: true,
      ref: "users",
      default: "691baa4f08ac59904e7f4dec",
    },
    imageUrl: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed"],
      default: "pending",
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
    minimize: false,
  }
);

const ContactModel = mongoose.model("contacts", ContactSchema);

export default ContactModel;
