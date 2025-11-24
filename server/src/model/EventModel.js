import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String || Number,
      required: true,
    },

    event: {
      type: String,
      required: true,
    },

    NumberOfGuest: {
      type: Number,
      required: true,
    },

    nearestBusTop: {
      type: String,
      required: true,
    },

    town: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    foods: {
      type: [String] || String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },

    month: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enm: ["pending", "active", "completed"],
      required: true,
      default: "pending",
    },
    year: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const EventModel = mongoose.model("events", EventSchema);

export default EventModel;
