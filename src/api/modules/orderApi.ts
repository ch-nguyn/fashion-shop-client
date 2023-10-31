import { CreateOrder } from "../../interfaces/orderInterface";
import privateClient from "../client/private.client";

const orderApi = {
  getAllOrders: () => privateClient.get("/orders"),
  getSingleOrder: (id: string) => privateClient.get(`/orders/${id}`),
  getUserOrders: () => privateClient.get(`/orders/my-orders`),
  createOrder: (params: CreateOrder) => privateClient.post(`/orders`, params),
};

export default orderApi;
