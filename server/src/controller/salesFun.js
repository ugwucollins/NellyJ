import ProductModel from "../model/ProductModel.js";
import SalesModel from "../model/SalesModel.js";
import { month, year } from "./Exporters.js";

export const GetAllSales = async (req, res) => {
  try {
    const Sales = await SalesModel.find({}).sort({ createdAt: -1 });

    if (!Sales.length) {
      return res.status(404).json({
        success: false,
        message: "Empty Sales Collection",
      });
    }

    return res.status(200).json({
      success: true,
      data: Sales,
      message: "All sales",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetSalesById = async (req, res) => {
  const { id } = req.params;
  try {
    const sales = await SalesModel.findById({ _id: id });

    if (!sales) {
      return res.status(404).json({
        success: false,
        message: "saleId Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: sales,
      message: "All sales Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetUsersSalesById = async (req, res) => {
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: " userId Not Found",
      });
    }
    const sales = await SalesModel.find({
      createdBy: userId,
    }).sort({ createdAt: -1 });

    if (!sales) {
      return res.status(404).json({
        success: false,
        message: " salesId Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: sales,
      message: "Get Users sales Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const CreateSales = async (req, res) => {
  const { items, orderId, deliveryFee } = req.body;
  const userId = req.userId;

  try {
    if (items.length === 0 || !userId) {
      return res.status(404).json({
        message: "invalid Data",
        success: false,
      });
    }

    let amount = await items.reduce(async (acc, item) => {
      const product = await ProductModel.findById({ _id: item.product });

      return (await acc) + product.price * item.quantity;
    }, 0);

    amount += deliveryFee;

    const data = {
      createdBy: userId,
      orderId: orderId,
      amount: amount,
      month: month,
      year: year,
    };

    const sales = await SalesModel.create(data);

    return res.status(201).json({
      success: true,
      data: sales,
      message: "sales Created Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const UpdateSalesById = async (req, res) => {
  const { id } = req.params;
  const { isPaid } = req.body;
  try {
    const sales = await SalesModel.findById({ _id: id });

    if (!sales) {
      return res.status(404).json({
        success: false,
        message: "salesId Not Found",
      });
    }

    const data = {
      isPaid: isPaid,
    };

    const Updatedsales = await SalesModel.findByIdAndUpdate({ _id: id }, data);

    return res.status(200).json({
      success: true,
      data: Updatedsales,
      message: "sales Details has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const DeleteSalesById = async (req, res) => {
  const { id } = req.params;
  try {
    const sales = await SalesModel.findById({ _id: id });

    if (!sales) {
      return res.status(404).json({
        success: false,
        message: " salesId Not Found",
      });
    }

    const DeletedSales = await SalesModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      data: DeletedSales,
      message: "sales Deleted Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
