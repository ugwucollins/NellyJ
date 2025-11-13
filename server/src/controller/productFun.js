import ProductModel from "../model/ProductModel.js";
import { month, year } from "../controller/Exporters.js";

export const GetAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "Empty Products Collection",
      });
    }

    return res.status(200).json({
      success: true,
      data: products,
      message: "All Product Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const GetProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById({ _id: id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: " ProductId Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: "All Product Details",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const CreateProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    imageUrl,
    deliveryFee,
    offerPrice,
    category,
    icon,
    instock,
  } = req.body;
  const userId = req.userId;

  const data = {
    name: name,
    description: description,
    price: price,
    imageUrl: imageUrl,
    deliveryFee: deliveryFee,
    offerPrice: offerPrice,
    category: category,
    icon: icon,
    instock: instock,
    month: month,
    year: year,
    createdBy: userId,
  };

  try {
    const product = await ProductModel.create(data);

    return res.status(201).json({
      success: true,
      data: product,
      message: "Product Created Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const UpdateProductById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    imageUrl,
    deliveryFee,
    offerPrice,
    category,
    icon,
    instock,
  } = req.body;
  try {
    const product = await ProductModel.findById({ _id: id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: " ProductId Not Found",
      });
    }
    const data = {
      name: name,
      description: description,
      price: price,
      imageUrl: imageUrl,
      deliveryFee: deliveryFee,
      offerPrice: offerPrice,
      category: category,
      icon: icon,
      instock: instock,
    };

    const UpdatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: id },
      data
    );

    return res.status(200).json({
      success: true,
      data: UpdatedProduct,
      message: "Product Details has been Updated",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};

export const DeleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById({ _id: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: " ProductId Not Found",
      });
    }

    const DeletedProduct = await ProductModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      data: DeletedProduct,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message,
      success: false,
    });
  }
};
