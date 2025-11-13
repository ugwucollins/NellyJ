import express from "express";
import {
  GetAllOrders,
  GetOrderById,
  CreateOrder,
  UpdateOrderById,
  DeleteOrderById,
} from "../controller/ordersFun.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
const ordersRouter = express.Router();

ordersRouter.get("/get", protectedAuth, GetAllOrders);
ordersRouter.get("/get/:id", protectedAuth, GetOrderById);
ordersRouter.post("/create", protectedAuth, CreateOrder);
ordersRouter.put("/update/:id", protectedAuth, UpdateOrderById);
ordersRouter.patch("/update/:id", protectedAuth, UpdateOrderById);
ordersRouter.delete("/delete/:id", protectedAuth, DeleteOrderById);

export default ordersRouter;
