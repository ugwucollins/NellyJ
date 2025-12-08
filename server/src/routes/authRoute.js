import express from "express";
import { configDotenv } from "dotenv";

import {
  Register,
  Login,
  CompleteProfile,
  Forget_Password,
  Reset_Password,
  CreateSeller,
} from "../controller/authFun.js";
configDotenv();

const authRoute = express.Router();

authRoute.post("/register", Register);
authRoute.post("/create/seller", CreateSeller);

authRoute.post("/login", Login);
authRoute.post("/forget_password", Forget_Password);
authRoute.post("/reset_password/:id/:token", Reset_Password);

authRoute.post("/completeProfile", CompleteProfile);

export default authRoute;
