import express from "express";
import {
  GetAllUsers,
  GetUserById,
  verifyUser,
  UpdateUserById,
  UpdateUserPassword,
} from "../controller/usersFun.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
const usersRouter = express.Router();

usersRouter.get("/", GetAllUsers);
usersRouter.get("/verify", protectedAuth, verifyUser);
usersRouter.get("/:id", GetUserById);
usersRouter.put("/update/:id", UpdateUserById);
usersRouter.patch("/update/:id", UpdateUserById);
usersRouter.post("/password/:id", UpdateUserPassword);
usersRouter.put("/password/:id", UpdateUserPassword);

export default usersRouter;
