import OrdersModel from "../model/OrdersModel.js";
import { month, year } from "../controller/Exporters.js";

export const GetAllOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find({});

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

export const CreateOrder = async (req, res) => {
  const {
    products,
    totalPrice,
    deliveryFee,
    orderStatus,
    address,
    isPaid,
    paymentMethod,
  } = req.body;
  const userId = req.userId;

  const data = {
    orderedBy: userId,
    products: products,
    totalPrice: totalPrice,
    deliveryFee: deliveryFee,
    orderStatus: orderStatus,
    address: address,
    isPaid: isPaid,
    paymentMethod: paymentMethod,
    month: month,
    year: year,
  };

  try {
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
