import axios from "axios";

const publicClient = axios.create({
  baseURL: `https://fashion-shop-server.onrender.com/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicClient;
