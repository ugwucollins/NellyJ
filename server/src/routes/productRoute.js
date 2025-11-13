import express from "express";
import {
  GetAllProducts,
  GetProductById,
  CreateProduct,
  UpdateProductById,
  DeleteProductById,
} from "../controller/productFun.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
const productRouter = express.Router();

productRouter.get("/get/", protectedAuth, GetAllProducts);
productRouter.get("/get/:id", protectedAuth, GetProductById);
productRouter.post("/create", protectedAuth, CreateProduct);
productRouter.put("/update/:id", protectedAuth, UpdateProductById);
productRouter.patch("/update/:id", protectedAuth, UpdateProductById);
productRouter.delete("/delete/:id", protectedAuth, DeleteProductById);

export default productRouter;
