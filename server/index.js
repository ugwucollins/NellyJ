import express from "express";
import "dotenv/config";
import authRoute from "./src/routes/authRoute.js";
import DBConnect from "./src/connections/db.connect.js";
import usersRouter from "./src/routes/usersRoute.js";
import cors from "cors";
import productRouter from "./src/routes/productRoute.js";
import addressRouter from "./src/routes/addressRoute.js";
import errorHandler from "./src/connections/errorHandler.js";
import ordersRouter from "./src/routes/ordersRoute.js";
import connectionCloudinary from "./src/controller/ImageUpLoad.js";
import router from "./src/routes/imageRouter.js";
import contactRouter from "./src/routes/contactRoute.js";
import eventRouter from "./src/routes/eventRoute.js";
DBConnect();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectionCloudinary();
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/auth", authRoute);
app.use("/api/auth/user", usersRouter);
app.use("/api/auth/v1", router);
app.use("/api/auth/v1/product", productRouter);
app.use("/api/auth/v1/user/address", addressRouter);
app.use("/api/auth/v1/orders", ordersRouter);
app.use("/api/auth/v1/contact", contactRouter);
app.use("/api/auth/v1/events", eventRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}!`);
});
