import express from "express";
import {
  GetAllAddresses,
  GetAddressById,
  CreateAddress,
  UpdateAddressById,
  DeleteAddressById,
  GetUsersAddress,
  UpdateUserAddressById,
} from "../controller/addressFun.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
const addressRouter = express.Router();

addressRouter.get("/get", GetAllAddresses);
addressRouter.get("/get/:id", protectedAuth, GetAddressById);
addressRouter.post("/create", protectedAuth, CreateAddress);
addressRouter.get("/get/address", protectedAuth, GetUsersAddress);
addressRouter.put("/update/user/:id", protectedAuth, UpdateUserAddressById);
addressRouter.put("/update/:id", protectedAuth, UpdateAddressById);
addressRouter.patch("/update/:id", protectedAuth, UpdateAddressById);
addressRouter.delete("/delete/:id", protectedAuth, DeleteAddressById);

export default addressRouter;
