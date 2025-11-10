import axios from "axios";
const baseUrl = "http://localhost:3800/api/auth";

const ApiURL = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiURL;
