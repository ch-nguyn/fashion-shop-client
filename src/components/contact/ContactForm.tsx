import { TextField } from "@mui/material";
import * as React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = useCallback(() => {
    Swal.fire(
      "Done!",
      "We will contact you as soon as possible!",
      "success"
    ).then((res) => {
      navigate("/");
      window.scrollTo(0, 0);
    });
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex gap-3 mb-5">
          <div className="basis-1/2">
            <TextField
              {...register("name", {
                required: true,
                pattern: /^[a-z ,.'-]+$/i,
              })}
              error={
                errors.name?.type === "required" ||
                errors.name?.type === "pattern"
              }
              className="w-full outline-none"
              label="Name"
              variant="outlined"
            />
            {errors.name?.type === "required" && (
              <span className="text-error text-xs">Your name is required</span>
            )}
            {errors.name?.type === "pattern" && (
              <span className="text-error text-xs">Invalid name</span>
            )}
          </div>
          <div className="basis-1/2">
            <TextField
              {...register("email", {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
              error={
                errors.email?.type === "required" ||
                errors.email?.type === "pattern"
              }
              className="w-full outline-none"
              label="Email"
              variant="outlined"
            />
            {errors.email?.type === "required" && (
              <span className="text-error text-xs">Your email is required</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-error text-xs">Invalid email</span>
            )}
          </div>
        </div>
        <div className="mb-5">
          <TextField
            {...register("phone", {
              required: true,
              pattern:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            })}
            error={
              errors.phone?.type === "required" ||
              errors.phone?.type === "pattern"
            }
            className="w-full outline-none"
            label="Phone"
            variant="outlined"
          />
          {errors.phone?.type === "required" && (
            <span className="text-error text-xs">
              Your phone number is required
            </span>
          )}
          {errors.phone?.type === "pattern" && (
            <span className="text-error text-xs">Invalid phone number</span>
          )}
        </div>
        <div className="mb-5">
          <TextField
            {...register("textArea", {
              required: true,
            })}
            error={errors.textArea?.type === "required"}
            multiline
            className="w-full"
            label="Message"
            variant="outlined"
            rows={10}
          />
          {errors.textArea?.type === "required" && (
            <span className="text-error text-xs">Message is required</span>
          )}
        </div>
        <div className="relative group/btn py-7">
          <button
            className="block w-full absolute top-0 left-0  h-full z-10 uppercase text-fresh  border-[1px] border-fresh hover:text-white duration-500"
            type="submit"
          >
            submit
          </button>
          <span
            className={`py-3 absolute top-0 left-0 bg-fresh h-full w-0 group-hover/btn:w-full duration-700`}
          ></span>
        </div>
      </div>
    </form>
  );
}
