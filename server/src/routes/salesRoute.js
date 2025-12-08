import express from "express";
import {
  GetAllSales,
  GetSalesById,
  CreateSales,
  UpdateSalesById,
  DeleteSalesById,
  GetUsersSalesById,
} from "../controller/salesFun.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
import authorizeRole, { ROLES } from "../middleware/role.middleware.js";
const salesRouter = express.Router();

salesRouter.get(
  "/get",
  protectedAuth,
  authorizeRole(ROLES.ADMIN, ROLES.SELLER),
  GetAllSales
);
salesRouter.get("/get/:id", protectedAuth, GetSalesById);
salesRouter.get("/get/users/Sales", protectedAuth, GetUsersSalesById);
salesRouter.post("/create", protectedAuth, CreateSales);
salesRouter.put("/update/:id", protectedAuth, UpdateSalesById);

salesRouter.patch("/update/:id", protectedAuth, UpdateSalesById);
salesRouter.delete(
  "/delete/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN),
  DeleteSalesById
);

export default salesRouter;
