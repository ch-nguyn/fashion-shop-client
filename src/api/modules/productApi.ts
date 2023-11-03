import axios from "axios";
import publicClient from "../client/public.client";
import privateClient from "../client/private.client";

const productApi = {
  getAllProducts: () => publicClient.get("/products"),
  getSingleProduct: (id: string | undefined) =>
    publicClient.get(`/products/${id}`),
  createProduct: (params: any) => privateClient.post("/products"),
  deleteProduct: (id: string) => privateClient.delete(`/products/${id}`),
  updateProduct: (id: string, params: any) =>
    privateClient.patch(`/products/${id}`, params),
  searchProduct: (name: string) =>
    publicClient.get(`/products/search?name=${name}`),
};

export default productApi;
