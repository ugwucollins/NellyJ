import express from "express";
import "dotenv/config";
import authRoute from "./src/routes/authRoute.js";
import DBConnect from "./src/connections/db.connect.js";
import usersRouter from "./src/routes/usersRoute.js";
import cors from "cors";
DBConnect();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/auth", authRoute);
app.use("/api/auth/user", usersRouter);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}!`);
});
