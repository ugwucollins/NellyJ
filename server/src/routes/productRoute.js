import express from "express";
import {
  GetAllProducts,
  GetProductById,
  CreateProduct,
  UpdateProductById,
  UpdateProductStocksById,
  DeleteProductById,
} from "../controller/productFun.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
import authorizeRole, { ROLES } from "../middleware/role.middleware.js";
const productRouter = express.Router();

productRouter.get(
  "/get/",
  protectedAuth,
  authorizeRole([ROLES.ADMIN, ROLES.SELLER]),
  GetAllProducts
);
productRouter.get("/get/:id", protectedAuth, GetProductById);
productRouter.post(
  "/create",
  protectedAuth,
  authorizeRole([ROLES.ADMIN, ROLES.SELLER]),
  CreateProduct
);
productRouter.put("/update/:id", protectedAuth, UpdateProductById);
productRouter.patch("/update/:id", protectedAuth, UpdateProductById);

productRouter.put(
  "/update/stock/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN),
  UpdateProductStocksById
);
productRouter.delete(
  "/delete/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN),
  DeleteProductById
);

export default productRouter;
