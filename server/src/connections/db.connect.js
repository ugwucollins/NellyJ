import mongoose from "mongoose";
import "dotenv/config";

const dbUrl = process.env.MONGODB_URL;

const DBConnect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected To DataBase Successfully");
  } catch (error) {
    console.log(error);
    console.log("failed  To Connect DataBase");
  }
};

export default DBConnect;
