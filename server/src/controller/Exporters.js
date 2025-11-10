import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

export const tokenGenerator = (id) => {
  console.log(id);
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const date = new Date();
export const month = date.toLocaleString("default", {
  month: "long",
});
export const year = date.getFullYear();
