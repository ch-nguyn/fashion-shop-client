import { Input } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UpdatePassword } from "../../interfaces/authInterface";
import Swal from "sweetalert2";
import authApi from "../../api/modules/authApi";
import { AxiosResponse } from "axios";

export interface IChangePasswordProps {}

export default function ChangePassword(props: IChangePasswordProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onSubmit = (data: any) => {
    Swal.fire({
      title: "Do you want to Change your password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0cc3ce",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // setIsLoading(true);
        // authApi.updatePassword(data).then((res) =>
        //   Swal.fire("Success!", "Your password is changed!", "success")
        //     .then(() => {
        //       setValue("oldPassword", "");
        //       setValue("newPassword", "");
        //       setValue("newPasswordConfirm", "");
        //     })
        //     .catch((e) => {
        //       Swal.fire("Oops...!", e.response.data.message, "error");
        //     })
        //     .finally(() => setIsLoading(false))
        // );
        (async () => {
          try {
            setIsLoading(true);
            const res: AxiosResponse = await authApi.updatePassword(data);
            Swal.fire("Success!", "Your password is changed!", "success").then(
              () => {
                setValue("oldPassword", "");
                setValue("newPassword", "");
                setValue("newPasswordConfirm", "");
              }
            );
            setIsLoading(false);
          } catch (e: any) {
            Swal.fire("Oops...!", e.response.data.message, "error");
            setIsLoading(false);
          }
        })();
      }
    });
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full mb-6 gap-8 items-center">
          <p className="basis-[25%] text-right">Old password:</p>
          <div className="basis-[75%]">
            <div>
              <Input
                {...register("oldPassword", {
                  required: true,
                })}
                error={errors.oldPassword?.type === "required"}
                placeholder="Old password"
                className="w-full focus:border-fresh"
                type="password"
                onChange={(e) => {
                  setValue("oldPassword", e.target.value);
                }}
              />
            </div>
            {errors.oldPassword?.type === "required" && (
              <span className="text-error text-xs">
                Old password is required
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full mb-6 gap-8 items-center">
          <p className="basis-[25%] text-right">New password:</p>
          <div className="basis-[75%]">
            <Input
              {...register("newPassword", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                minLength: 8,
                validate: (val: string) => {
                  if (watch("oldPassword") === val) {
                    return false;
                  }
                },
              })}
              error={
                errors.newPassword?.type === "required" ||
                errors.newPassword?.type === "pattern" ||
                errors.newPassword?.type === "minLength" ||
                errors.newPassword?.type === "validate"
              }
              onChange={(e) => {
                setValue("newPassword", e.target.value);
              }}
              type={"password"}
              className="w-full"
              placeholder="New password"
            />
            {errors.newPassword?.type === "required" && (
              <span className="text-error text-xs">Password is required</span>
            )}
            {errors.newPassword?.type === "pattern" && (
              <span className="text-error text-xs">
                Password must contain 1 uppercase, 1 lowercase, 1 number and no
                space
              </span>
            )}
            {errors.newPassword?.type === "validate" && (
              <span className="text-error text-xs">
                New password must be different from old one
              </span>
            )}
            {errors.newPassword?.type === "minLength" && (
              <span className="text-error text-xs">
                Password must have 8 characters at least
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full mb-6 gap-8 items-center">
          <p className="basis-[25%] text-right">Password confirm:</p>
          <div className="basis-[75%]">
            <div>
              <Input
                {...register("newPasswordConfirm", {
                  required: true,
                  validate: (val: string) => {
                    if (watch("newPassword") !== val) {
                      return false;
                    }
                  },
                })}
                error={
                  errors.newPasswordConfirm?.type === "required" ||
                  errors.newPasswordConfirm?.type === "validate"
                }
                onChange={(e) => {
                  setValue("newPasswordConfirm", e.target.value);
                }}
                type={"password"}
                className="w-full"
                placeholder="Password confirm"
              />
            </div>
            {errors.newPasswordConfirm?.type === "required" && (
              <span className="text-error text-xs">Password is required</span>
            )}
            {errors.newPasswordConfirm?.type === "validate" && (
              <span className="text-error text-xs">
                Password confirm must match new password
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type={isLoading ? "button" : "submit"}
            className="border py-3 px-5 hover:bg-black hover:text-white duration-300"
          >
            {isLoading ? "Loading..." : "Update password"}
          </button>
        </div>
      </form>
    </div>
  );
}
