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
import salesRouter from "./src/routes/salesRoute.js";
DBConnect();
const { PORT, API_PATH } = process.env;

const app = express();
const port = PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://nelly-j.vercel.app",
    // origin: "http://localhost:5173",
    credentials: true,
  })
);

connectionCloudinary();
app.get("/", (req, res) => res.send("Hello World!"));
app.use(`${API_PATH}`, authRoute);
app.use(`${API_PATH}/user`, usersRouter);
app.use(`${API_PATH}/v1`, router);
app.use(`${API_PATH}/v1/product`, productRouter);
app.use(`${API_PATH}/v1/user/address`, addressRouter);
app.use(`${API_PATH}/v1/orders`, ordersRouter);
app.use(`${API_PATH}/v1/sales`, salesRouter);
app.use(`${API_PATH}/v1/contact`, contactRouter);
app.use(`${API_PATH}/v1/events`, eventRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}!`);
});
