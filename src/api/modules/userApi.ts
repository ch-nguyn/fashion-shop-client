import { UpdateUser } from "../../interfaces/userInterface";
import imageClient from "../client/image.client";
import privateClient from "../client/private.client";

const userApi = {
  getAllUsers: () => privateClient.get("/users"),
  getSingleUsers: (id: string) => privateClient.get(`/users/${id}`),
  getMe: () => privateClient.get("/users/me"),
  deleteMe: () => privateClient.delete("/users/delete-me"),
  uploadPhoto: (params: any) => imageClient.patch("/users/update-me", params),
  updateMe: (params: UpdateUser) =>
    privateClient.patch("/users/update-me", params),
  deleteUser: (id: string) => privateClient.delete(`/users/${id}`),
  deleteAddress: (id: string) =>
    privateClient.delete(`/users/delete-address/${id}`),
};

export default userApi;
