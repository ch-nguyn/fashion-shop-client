import { CircularProgress, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { ILogin } from "../../interfaces/authInterface";
import { useForm } from "react-hook-form";
import authApi from "../../api/modules/authApi";
import { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

export interface ILoginFormProps {
  setStatus: React.Dispatch<React.SetStateAction<"login" | "signup">>;
  login: ILogin;
  setLogin: React.Dispatch<React.SetStateAction<ILogin>>;
}

export default function LoginForm(props: ILoginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = () => {
    setIsLoading(true);
    authApi
      .login(props.login)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          Swal.fire(
            "Success!",
            `Welcome back ${res.data.user.name}!`,
            "success"
          ).then(() => {
            navigate("/account/me/profile");
            window.scrollTo(0, 0);
          });
        }
      })
      .catch((e: any) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.response.data.message,
        })
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <TextField
            autoComplete="off"
            value={props.login.email}
            disabled={isLoading}
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}
            error={
              errors.email?.type === "required" ||
              errors.email?.type === "pattern"
            }
            onChange={(e) => {
              props.setLogin({ ...props.login, email: e.target.value });
            }}
            className="w-full"
            id="outlined-basic"
            label="Email address*"
            variant="outlined"
          />
          {errors.email?.type === "required" && (
            <span className="text-error text-xs">Your email is required</span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-error text-xs">Invalid email</span>
          )}
        </div>
        <div className="relative mb-10">
          <TextField
            autoComplete="off"
            value={props.login.password}
            disabled={isLoading}
            sx={{ outlineColor: "white !important" }}
            {...register("password", {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              minLength: 8,
            })}
            error={
              errors.password?.type === "required" ||
              errors.password?.type === "pattern" ||
              errors.password?.type === "minLength"
            }
            onChange={(e: any) => {
              props.setLogin({ ...props.login, password: e.target.value });
            }}
            type={"password"}
            className="w-full"
            label="Password*"
            variant="outlined"
          />

          {errors.password?.type === "required" && (
            <span className="text-error text-xs">Password is require</span>
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

        <div className="relative group/btn py-7 bg-black mb-5">
          <button
            className="block w-full absolute top-0 left-0  h-full z-10 uppercase text-white  hover:text-white duration-500"
            type="submit"
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "log in"
            )}
          </button>
          <span
            className={`py-3 absolute top-0 left-0 bg-fresh h-full w-0 group-hover/btn:w-full duration-700`}
          ></span>
        </div>
        <div
          onClick={() => navigate("/account/forgot-password")}
          className="underline hover:text-fresh cursor-pointer mb-3"
        >
          Lost your password?
        </div>
        <div className="">
          No account?{" "}
          <span
            onClick={() => {
              props.setStatus("signup");
              props.setLogin({
                email: "",
                password: "",
              });
            }}
            className="underline hover:text-fresh cursor-pointer"
          >
            Create one
          </span>
        </div>
      </form>
    </div>
  );
}
