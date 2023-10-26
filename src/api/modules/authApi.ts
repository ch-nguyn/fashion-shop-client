import axios from "axios";
import { ILogin, Signup, UpdatePassword } from "../../interfaces/authInterface";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const authApi = {
  refreshToken: (refToken: string) =>
    publicClient.post("/auth/refresh-token", { refreshToken: refToken }),
  signup: (params: Signup) => publicClient.post("/auth/signup", params),
  login: (params: ILogin) => publicClient.post("/auth/login", params),
  logout: () => privateClient.post("/auth/logout"),
  adminSignup: (params: Signup) =>
    privateClient.post("/auth/admin-signup", params),
  forgotPassword: (email: string) =>
    publicClient.post("/auth/forgot-password", { email }),
  resetPassword: (token: string | undefined, params: UpdatePassword) =>
    publicClient.patch(`/auth/reset-password/${token}`, params),
  verifyAccount: (id: string) =>
    publicClient.patch(`/auth/verify-account/${id}`),
  updatePassword: (params: UpdatePassword) =>
    privateClient.patch("/auth/update-password", params),
};

export default authApi;
