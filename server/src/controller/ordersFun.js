import OrdersModel from "../model/OrdersModel.js";
import ProductModel from "../model/ProductModel.js";
import { month, year } from "../controller/Exporters.js";

export const GetAllOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find({}).populate("address orderedBy");

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
    const order = await OrdersModel.findOne({ orderedBy: userId }).populate(
      "products"
    );

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
  const { products, deliveryFee, address } = req.body;
  const userId = req.userId;

  try {
    if (products.length === 0 || !userId || !address) {
      return res.status(404).json({
        message: "invalid Data",
        success: false,
      });
    }

    let amount = await products.reduce(async (acc, item) => {
      const product = await ProductModel.findById({ _id: item.product });

      return (await acc) + product.price * item.quantity;
    }, 0);

    // add tax
    // amount += Math.floor(amount + 0.05);

    const data = {
      orderedBy: userId,
      products: products,
      totalPrice: amount,
      deliveryFee: deliveryFee,
      address: address,
      month: month,
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
