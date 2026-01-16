import express from "express";
import { protectedAuth } from "../middleware/auth.middleware.js";
import authorizeRole, { ROLES } from "../middleware/role.middleware.js";
import {
  CreateTeams,
  DeleteTeamsById,
  GetAllTeams,
  GetTeamsById,
  GetUsersTeams,
  UpdateTeamsById,
} from "../controller/teamsFun.js";

const teamsRouter = express.Router();

teamsRouter.get("/get", GetAllTeams);
teamsRouter.get("/get/:id", protectedAuth, GetTeamsById);

teamsRouter.post(
  "/create",
  protectedAuth,
  authorizeRole(ROLES.ADMIN),
  CreateTeams
);
teamsRouter.get("/get/Teams", protectedAuth, GetUsersTeams);

teamsRouter.put(
  "/update/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN),
  UpdateTeamsById
);

teamsRouter.patch(
  "/update/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN),
  UpdateTeamsById
);

teamsRouter.delete(
  "/delete/:id",
  protectedAuth,
  authorizeRole(ROLES.ADMIN),
  DeleteTeamsById
);

export default teamsRouter;
