import { CircularProgress, TextField } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApi from "../api/modules/authApi";
import { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export interface IForgotPasswordProps {}

export default function ForgotPassword(props: IForgotPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("refreshToken")) navigate("/account/me/profile");
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    authApi
      .forgotPassword(email)
      .then((res: AxiosResponse) => {
        Swal.fire("Success!", "Token sent to your email!", "success").then(() =>
          navigate("/account/login")
        );
      })
      .catch((e) => {
        Swal.fire("Oops...", e.response.data.message, "error");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mx-auto max-w-[1200px] mb-20 px-5">
      <p className="text-gray mb-6">
        Lost your password? Please enter your username or email address. You
        will receive a link to create a new password via email.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <div>
            <TextField
              value={email}
              disabled={isLoading}
              {...register("email", {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
              error={
                errors.email?.type === "required" ||
                errors.email?.type === "pattern"
              }
              onChange={(e) => setEmail(e.target.value)}
              className="w-96 max-sm:w-full"
              label="Email address*"
              variant="outlined"
            />
          </div>
          {errors.email?.type === "required" && (
            <span className="text-error text-xs">Your email is required</span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-error text-xs">Invalid email</span>
          )}
        </div>
        <button
          type="submit"
          className="border  hover:border-fresh hover:text-white hover:bg-fresh py-3 px-7 duration-300"
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <span>Send to email</span>
              <i className="fa-light fa-paper-plane ml-2"></i>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
