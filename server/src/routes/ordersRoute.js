import express from "express";
import {
  GetAllOrders,
  GetOrderById,
  CreateOrder,
  UpdateOrderById,
  DeleteOrderById,
  GetUsersOrderById,
  UpdateOrderStatusById,
  CreateOrderPayF,
  VerifyOrderPay,
} from "../controller/ordersFun.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
import authorizeRole, { ROLES } from "../middleware/role.middleware.js";
const ordersRouter = express.Router();

ordersRouter.get(
  "/get",
  protectedAuth,
  authorizeRole(ROLES.ADMIN, ROLES.SELLER),
  GetAllOrders
);
ordersRouter.get("/get/:id", protectedAuth, GetOrderById);
ordersRouter.get("/get/users/order", protectedAuth, GetUsersOrderById);
ordersRouter.post("/create", protectedAuth, CreateOrder);
ordersRouter.post(
  "/create/payment_init/checkout",
  protectedAuth,
  CreateOrderPayF
);
ordersRouter.post("/verify-payment", protectedAuth, VerifyOrderPay);
ordersRouter.put("/update/:id", protectedAuth, UpdateOrderById);

ordersRouter.put(
  "/update/status/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN, ROLES.SELLER),
  UpdateOrderStatusById
);

ordersRouter.patch("/update/:id", protectedAuth, UpdateOrderById);
ordersRouter.delete(
  "/delete/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN),
  DeleteOrderById
);

export default ordersRouter;
