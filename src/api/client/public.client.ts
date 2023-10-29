import axios from "axios";

const publicClient = axios.create({
  baseURL: `https://fashion-shop-server-production.up.railway.app/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicClient;
