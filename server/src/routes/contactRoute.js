import express from "express";
import {
  GetAllContact,
  GetContactById,
  CreateContact,
  GetUsersContact,
  UpdateContactById,
  DeleteContactById,
} from "../controller/contactFun.js";
import { protectedAuth } from "../middleware/auth.middleware.js";
import authorizeRole, { ROLES } from "../middleware/role.middleware.js";

const contactRouter = express.Router();

contactRouter.get(
  "/get",
  protectedAuth,
  authorizeRole(ROLES.ADMIN, ROLES.SELLER),
  GetAllContact
);
contactRouter.get("/get/:id", protectedAuth, GetContactById);

contactRouter.post("/create", CreateContact);
contactRouter.get("/get/Contact", protectedAuth, GetUsersContact);

contactRouter.put(
  "/update/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN, ROLES.SELLER),
  UpdateContactById
);

contactRouter.patch(
  "/update/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN, ROLES.SELLER),
  UpdateContactById
);

contactRouter.delete(
  "/delete/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN),
  DeleteContactById
);

export default contactRouter;
