import { CircularProgress, TextField } from "@mui/material";
import * as React from "react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Signup } from "../../interfaces/authInterface";
import authApi from "../../api/modules/authApi";
import { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export interface ISignupFormProps {
  setStatus: React.Dispatch<React.SetStateAction<"login" | "signup">>;
}

export default function SignupForm(props: ISignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [signup, setSignup] = useState<Signup>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  });

  const onSubmit = () => {
    setIsLoading(true);
    authApi
      .signup(signup)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          Swal.fire(
            "Success!",
            "Please verify your account in email",
            "success"
          ).then(() => {
            setSignup({
              name: "",
              email: "",
              phoneNumber: "",
              password: "",
              passwordConfirm: "",
            });
            props.setStatus("login");
          });
        }
      })
      .finally(() => setIsLoading(false))
      .catch((e) => {
        console.log(e);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username or Email already exists",
        });
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <TextField
            autoComplete="off"
            value={signup.name}
            disabled={isLoading}
            {...register("name", {
              required: true,
              minLength: 4,
            })}
            error={
              errors.name?.type === "required" ||
              errors.name?.type === "minLength"
            }
            onChange={(e) => {
              setSignup({ ...signup, name: e.target.value });
            }}
            className="w-full"
            label="Username*"
            variant="standard"
          />
          {errors.name?.type === "required" && (
            <span className="text-error text-xs">
              Your username is requiredd
            </span>
          )}
          {errors.name?.type === "minLength" && (
            <span className="text-error text-xs">
              Username must contain at least 4 characters
            </span>
          )}
        </div>

        <div className="mb-6">
          <TextField
            autoComplete="off"
            value={signup.email}
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
              setSignup({ ...signup, email: e.target.value });
            }}
            className="w-full"
            label="Email address*"
            variant="standard"
          />
          {errors.email?.type === "required" && (
            <span className="text-error text-xs">Your email is required</span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-error text-xs">Invalid email</span>
          )}
        </div>

        <div className="relative mb-6">
          <TextField
            autoComplete="off"
            value={signup.phoneNumber}
            disabled={isLoading}
            sx={{ outlineColor: "white !important" }}
            {...register("phone", {
              required: true,
              pattern:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            })}
            error={
              errors.phone?.type === "required" ||
              errors.phone?.type === "pattern"
            }
            onChange={(e) => {
              setSignup({ ...signup, phoneNumber: e.target.value });
            }}
            className="w-full"
            label="Phone number*"
            variant="standard"
          />

          {errors.phone?.type === "required" && (
            <span className="text-error text-xs">Phone number is required</span>
          )}
          {errors.phone?.type === "pattern" && (
            <span className="text-error text-xs">Invalid phone number</span>
          )}
        </div>

        <div className="relative mb-6">
          <TextField
            autoComplete="off"
            value={signup.password}
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
              setSignup({ ...signup, password: e.target.value });
            }}
            type={"password"}
            className="w-full"
            label="Password*"
            variant="standard"
          />

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
          <TextField
            autoComplete="off"
            value={signup.passwordConfirm}
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
              setSignup({ ...signup, passwordConfirm: e.target.value });
            }}
            type={"password"}
            className="w-full"
            label="Password confirm*"
            variant="standard"
          />
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

        <div className="relative group/btn py-7 bg-black mb-5">
          <button
            className="block w-full absolute top-0 left-0  h-full z-10 uppercase text-white  hover:text-white duration-500"
            type="submit"
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "sign up"
            )}
          </button>
          <span
            className={`py-3 absolute top-0 left-0 bg-fresh h-full w-0 group-hover/btn:w-full duration-700`}
          ></span>
        </div>
      </form>
    </div>
  );
}
