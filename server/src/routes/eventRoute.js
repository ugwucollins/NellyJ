import express from "express";
import {
  GetAllEvents,
  GetEventById,
  CreateEvent,
  GetUsersEvent,
  UpdateUserEventById,
  UpdateEventById,
  DeleteEventById,
} from "../controller/eventFun.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
import authorizeRole, { ROLES } from "../middleware/role.middleware.js";

const eventRouter = express.Router();

eventRouter.get(
  "/get",
  protectedAuth,
  authorizeRole(ROLES.ADMIN, ROLES.SELLER),
  GetAllEvents
);
eventRouter.get("/get/:id", protectedAuth, GetEventById);
eventRouter.post("/create", protectedAuth, CreateEvent);

eventRouter.get("/get/event/user", protectedAuth, GetUsersEvent);

eventRouter.put("/update/user/:id", protectedAuth, UpdateUserEventById);

eventRouter.put(
  "/update/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN, ROLES.SELLER),
  UpdateEventById
);

eventRouter.patch(
  "/update/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN, ROLES.SELLER),
  UpdateEventById
);
eventRouter.delete(
  "/delete/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN),
  DeleteEventById
);

export default eventRouter;
