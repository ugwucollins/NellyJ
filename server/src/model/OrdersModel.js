import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    products: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "products",
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    orderStatus: {
      type: String,
      required: true,
    },

    address: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "addresses",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      required: true,
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
  { timestamps: true }
);

const OrdersModel = mongoose.model("orders", OrdersSchema);

export default OrdersModel;
