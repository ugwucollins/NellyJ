import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is Required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is Required"],
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
    },
    phoneNumber: {
      type: String || Number,
    },
    password: {
      type: String,
      required: true,
      // min: [8, "Password must be at least 8 characters"],
      // max: [20, "Password must be less than 12 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [String],
      default: ["2013"],
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    cartItems: {
      type: [
        {
          itemName: {
            type: String,
          },
          price: {
            type: Number,
            default: 0,
            // required: true,
          },
          quantity: {
            type: Number,
            // required: tru
            default: 0,
          },
        },
        {
          timestamps: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
