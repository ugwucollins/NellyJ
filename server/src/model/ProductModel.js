import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: [String] || Array || String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    icon: {
      type: Number,
      required: true,
      default: 4,
    },
    instock: {
      type: Boolean,
      required: true,
      default: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },

  { timestamps: true }
);

const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;
