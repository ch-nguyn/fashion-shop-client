import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { UpdatePassword } from "../interfaces/authInterface";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import authApi from "../api/modules/authApi";
import { AxiosResponse } from "axios";
import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export interface IResetPasswordProps {}

export default function ResetPassword(props: IResetPasswordProps) {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [resetPassword, setResetPassword] = useState<UpdatePassword>({
    password: "",
    passwordConfirm: "",
  });
  useEffect(() => {
    if (Cookies.get("refreshToken")) navigate("/account/me");
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    authApi
      .resetPassword(token, resetPassword)
      .then((res: AxiosResponse) => {
        Swal.fire("Success!", "Your password is changed!", "success").then(() =>
          navigate("/account/me")
        );
      })
      .catch((e) =>
        Swal.fire("Oops...", e.response.data.message, "error").then(() =>
          navigate("/account/login")
        )
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mb-20 max-w-[1200px] mx-auto px-5 max-sm:text-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-gray mb-6">Change your password:</p>
        <div className="relative mb-6">
          <div>
            <TextField
              value={resetPassword.password}
              disabled={isLoading}
              sx={{ outlineColor: "white !important" }}
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                minLength: 8,
              })}
              error={
                errors.password?.type === "required" ||
                errors.password?.type === "pattern" ||
                errors.password?.type === "minLength"
              }
              onChange={(e) => {
                setResetPassword({
                  ...resetPassword,
                  password: e.target.value,
                });
              }}
              type={"password"}
              className="w-96 max-sm:w-full"
              label="New password*"
              variant="outlined"
            />
          </div>

          {errors.password?.type === "required" && (
            <span className="text-error text-xs">Password is required</span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-error text-xs">
              Password must contain 1 uppercase, 1 lowercase, 1 number and no
              space
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-error text-xs">
              Password must have 8 characters at least
            </span>
          )}
        </div>

        <div className="relative mb-10">
          <div>
            <TextField
              value={resetPassword.passwordConfirm}
              disabled={isLoading}
              sx={{ outlineColor: "white !important" }}
              {...register("passwordConfirm", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return false;
                  }
                },
              })}
              error={
                errors.passwordConfirm?.type === "required" ||
                errors.passwordConfirm?.type === "validate"
              }
              onChange={(e) => {
                setResetPassword({
                  ...resetPassword,
                  passwordConfirm: e.target.value,
                });
              }}
              type={"password"}
              className="w-96 max-sm:w-full"
              label="Password confirm*"
              variant="outlined"
            />
          </div>
          {errors.passwordConfirm?.type === "required" && (
            <span className="text-error text-xs">
              Password confirm is required
            </span>
          )}
          {errors.passwordConfirm?.type === "validate" && (
            <span className="text-error text-xs">
              Your passwords do no match
            </span>
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
              <span>Change password</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
