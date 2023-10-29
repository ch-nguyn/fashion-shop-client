import axios from "axios";

const publicClient = axios.create({
  baseURL: `/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicClient;
