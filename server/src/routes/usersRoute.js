import express from "express";
import {
  GetAllUsers,
  GetUserById,
  verifyUser,
  UpdateUserById,
  UpdateUserPassword,
} from "../controller/usersFun.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
import { UpdateUserCart } from "../controller/updateCartFun.js";
import { UpdateWishList } from "../controller/UpdateWishListFun.js";
const usersRouter = express.Router();

usersRouter.get("/", GetAllUsers);
usersRouter.get("/verify", protectedAuth, verifyUser);
usersRouter.get("/get/:id", GetUserById);
usersRouter.put("/update", protectedAuth, UpdateUserById);
usersRouter.put("/whishList/update", protectedAuth, UpdateWishList);
usersRouter.post("/whishList/update", protectedAuth, UpdateWishList);
usersRouter.put("/cart/update", protectedAuth, UpdateUserCart);
usersRouter.post("/cart/update", protectedAuth, UpdateUserCart);
usersRouter.patch("/update", protectedAuth, UpdateUserById);
usersRouter.post("/password/:id", UpdateUserPassword);
usersRouter.put("/password/:id", UpdateUserPassword);

export default usersRouter;
