import OrdersModel from "../model/OrdersModel.js";
import ProductModel from "../model/ProductModel.js";
import { month, year } from "../controller/Exporters.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import "dotenv/config";
const { PAYSTACK_SECRET_KEY, JWT_SECRET } = process.env;

import Paystack from "@paystack/paystack-sdk";
import UserModel from "../model/UserModel.js";

const payStack = new Paystack(PAYSTACK_SECRET_KEY);

export const GetAllOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find({
      // $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate(
        "address orderedBy items.product",
        "-password -roles -isVerified -cartItems -wishList"
      )
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "Empty Orders Collection",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
      message: "All Order Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrdersModel.findById({ _id: id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: " OrderId Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
      message: "All Order Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
export const GetUsersOrderById = async (req, res) => {
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: " userId Not Found",
      });
    }
    const order = await OrdersModel.find({
      orderedBy: userId,
      $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate(
        "address orderedBy items.product",
        "-password -roles -isVerified -cartItems -wishList"
      )
      .sort({ createdAt: -1 });
    // .populate({
    //   path: "items",
    //   populate: { path: "product", model: "products" },
    // })
    // .exec();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: " OrderId Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
      message: "Get Users Order Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const CreateOrder = async (req, res) => {
  const { items, deliveryFee, address, paymentMethod } = req.body;
  const userId = req.userId;

  try {
    if (items.length === 0 || !userId || !address) {
      return res.status(404).json({
        message: "invalid Data",
        success: false,
      });
    }

    let amount = await items.reduce(async (acc, item) => {
      const product = await ProductModel.findById({ _id: item.product });

      return (await acc) + product.price * item.quantity;
    }, 0);

    // add tax
    // amount += Math.floor(amount + 0.05);

    const data = {
      orderedBy: userId,
      items: items,
      totalPrice: amount,
      deliveryFee: deliveryFee,
      address: address,
      month: month,
      paymentMethod: paymentMethod,

      year: year,
    };

    const order = await OrdersModel.create(data);

    return res.status(201).json({
      success: true,
      data: order,
      message: "Order Created Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
// payStack payment
export const CreateOrderPayF = async (req, res) => {
  const { items, deliveryFee, address, paymentMethod } = req.body;
  const userId = req.userId;

  try {
    if (items.length === 0) {
      return res.status(404).json({
        message: "invalid Data|| No Items added",
        success: false,
      });
    }
    if (!address) {
      return res.status(404).json({
        message: "invalid Address",
        success: false,
      });
    }
    if (!userId) {
      return res.status(404).json({
        message: "user Does not Exist",
        success: false,
      });
    }

    const user = await UserModel.findById({ _id: userId }).select(
      "-password -roles"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
        success: false,
      });
    }

    let amount = await items.reduce(async (acc, item) => {
      const product = await ProductModel.findById({ _id: item.product });
      return (await acc) + product.price * item.quantity;
    }, 0);

    // add tax
    // amount += Math.floor(amount + 0.05);

    let orderId;
    let responseId;

    // res.status(201).json({
    //   success: true,
    //   data: order,
    //   url: "/orders",
    //   message: "Order Created Successfully",
    // });

    const response = await payStack.transaction.initialize({
      email: user.email,
      amount: Math.floor(amount + deliveryFee) * 100,
      metadata: {
        orderId: orderId,
      },
      callback_url: `http://localhost:5173/verify_payment_status?reference=${responseId}`,
    });

    if (response.status) {
      const data = {
        orderedBy: userId,
        items: items,
        totalPrice: amount,
        deliveryFee: deliveryFee,
        address: address,
        paymentMethod: paymentMethod,
        month: month,
        reference: response.data.reference,
        year: year,
      };
      const order = await OrdersModel.create(data);
      const token = jwt.sign({ id: order._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      orderId = order._id;
      responseId = response.data.reference;
      const { authorization_url, reference } = response.data;

      return res.status(201).json({
        success: true,
        data: {
          url: response.data.authorization_url || authorization_url,
          res: response.data.reference || reference,
          token: token,
        },
        message: "Order " + response.message,
      });
      // call paystack api
    } else {
      return res.status(404).json({
        success: false,
        message: "Order" + response.message,
      });
    }
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const VerifyOrderPay = async (req, res) => {
  const { reference, token } = req.body || req.query;
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(404).json({
        message: "user Does not Exist",
        success: false,
      });
    }

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false,
      });
    }

    const user = await UserModel.findById({ _id: userId }).select(
      "-password -roles"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
        success: false,
      });
    }
    if (!reference) {
      return res.status(404).json({
        message: "reference not Found",
        success: false,
      });
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === "success") {
      const data = {
        isPaid: true,
      };

      // const orderItem = await OrdersModel.findOne({
      //   reference: reference || paymentData.customer.metadata,
      // });

      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.id) {
        const orderItem = await OrdersModel.findById({
          _id: decoded.id,
        });

        if (orderItem) {
          const order = await OrdersModel.findByIdAndUpdate(
            { _id: decoded.id },
            data,
            {
              new: true,
            }
          );
          await UserModel.findByIdAndUpdate(
            { _id: userId },
            {
              cartItems: {},
            },
            {
              new: true,
            }
          );

          return res.status(201).json({
            success: true,
            status: paymentData.status,
            data: order.save(),
            message: "Order completed successfully",
          });
        } else {
          return res.status(201).json({
            success: false,
            status: paymentData.status,
            message: "Order process failed",
          });
        }
      } else {
        res.status(401).json({
          message: "No Order token provided",
          success: false,
        });
      }

      // call paystack api
    } else {
      const order = await OrdersModel.findByIdAndDelete({
        _id: paymentData.metadata.orderId,
      });
      return res.status(404).json({
        success: false,
        data: order,
        message: "Order deleted Successfully" || response.message,
      });
    }
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const UpdateOrderById = async (req, res) => {
  const { id } = req.params;
  const {
    products,
    totalPrice,
    deliveryFee,
    orderStatus,
    isPaid,
    paymentMethod,
  } = req.body;
  try {
    const order = await OrdersModel.findById({ _id: id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "OrderId Not Found",
      });
    }

    const data = {
      products: products,
      totalPrice: totalPrice,
      deliveryFee: deliveryFee,
      orderStatus: orderStatus,
      isPaid: isPaid,
      paymentMethod: paymentMethod,
    };

    const UpdatedOrder = await OrdersModel.findByIdAndUpdate({ _id: id }, data);

    return res.status(200).json({
      success: true,
      data: UpdatedOrder,
      message: "Order Details has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const UpdateOrderStatusById = async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  try {
    const order = await OrdersModel.findById({ _id: id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "OrderId Not Found",
      });
    }

    const data = {
      orderStatus: orderStatus,
    };

    const UpdatedOrder = await OrdersModel.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: UpdatedOrder,
      message: "Order status has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const DeleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrdersModel.findById({ _id: id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: " OrderId Not Found",
      });
    }

    const DeletedOrder = await OrdersModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      data: DeletedOrder,
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
