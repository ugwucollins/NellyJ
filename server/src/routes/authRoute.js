import express from "express";
import { configDotenv } from "dotenv";

import { Register, Login, CompleteProfile } from "../controller/authFun.js";
configDotenv();

const authRoute = express.Router();

authRoute.post("/register", Register);

authRoute.post("/login", Login);

authRoute.post("/completeProfile", CompleteProfile);

export default authRoute;
