import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@mui/material";
import Swal from "sweetalert2";
import userApi from "../../api/modules/userApi";
import { AxiosResponse } from "axios";
import AccountDetailsSke from "../skeleton/AccountDetailsSke";
import { useAppSelector } from "../../store/hooks";

export interface IAccountDetailsProps {
  isLoading: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountDetails(props: IAccountDetailsProps) {
  const [isChange, setIsChange] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const { user } = useAppSelector((state) => state.user);
  const [img, setImg] = useState<string>(user.photo);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("name", user.name);
    setValue("fullName", user.fullName);
    setValue("phoneNumber", user.phoneNumber);
    setImg(user.photo);
  }, [user]);

  const handleUpload = (e: any) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      var binaryData = [];
      binaryData.push(e.target.files[0]);
      setImg(
        window.URL.createObjectURL(
          new Blob(binaryData, { type: "application/zip" })
        )
      );
    }
  };

  const handleClick = () => {
    if (file) {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("img", file);

      userApi
        .uploadPhoto(formData)
        .then(() =>
          Swal.fire("Updated", "Your avatar has been updated.", "success")
        )
        .catch((e) => {
          Swal.fire("Oops...!", "Something went wrong.", "error");
          console.log(e);
        })
        .finally(() => {
          setUploadLoading(false);
          setFile(null);
        });
    }
  };

  const onSubmit = (data: any) => {
    Swal.fire({
      title: "Do you want to update profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0cc3ce",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, right now!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSubmitLoading(true);
        setIsChange(false);
        userApi
          .updateMe(data)
          .then((res: AxiosResponse) => {
            Swal.fire("Success!", "Updated your profile!", "success");
          })
          .catch((err) =>
            Swal.fire("Oops...!", "Username already existed!", "error").then(
              () => setIsChange(true)
            )
          )
          .finally(() => setSubmitLoading(false));
      }
    });
  };

  return (
    <div className="">
      {!props.isLoading ? (
        <div className="flex items-center w-full gap-10 max-md:flex-wrap-reverse">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="basis-3/4 max-md:basis-full"
          >
            <div className="flex w-full mb-6 gap-8">
              <p className="basis-[25%] text-right">Email:</p>
              <p className="basis-[75%]">{user?.email}</p>
            </div>
            <div className="flex w-full mb-6 items-center gap-8">
              <p className="basis-[25%] text-right">Username:</p>
              <div className="basis-[75%] ">
                <div>
                  <Input
                    {...register("name", {
                      required: true,
                      minLength: 4,
                      maxLength: 20,
                    })}
                    error={
                      errors.name?.type === "required" ||
                      errors.name?.type === "minLength" ||
                      errors.name?.type === "maxLength"
                    }
                    placeholder="Username"
                    className="w-full outline-none  border-gray focus:border-fresh"
                    defaultValue={user.name}
                    onChange={(e) => {
                      setIsChange(true);
                    }}
                  />
                </div>
                {errors.name?.type === "required" && (
                  <span className="text-error text-xs">
                    Username is required
                  </span>
                )}
                {errors.name?.type === "minLength" ||
                errors.name?.type === "maxLength" ? (
                  <span className="text-error text-xs">
                    Username must have more than 4 and less than 20 characters
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="flex w-full mb-6 items-center gap-8">
              <p className="basis-[25%] text-right">Full name:</p>
              <div className="basis-[75%] ">
                <Input
                  {...register("fullName", {})}
                  placeholder="Full name"
                  className="w-full"
                  onChange={(e) => {
                    setIsChange(true);
                  }}
                />
              </div>
            </div>

            <div className="flex w-full mb-10 items-center gap-8">
              <p className="basis-[25%]  text-right">Phone number:</p>
              <div className="basis-[75%]  ">
                <Input
                  {...register("phoneNumber", {
                    required: true,
                    pattern:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                    minLength: 10,
                    maxLength: 10,
                  })}
                  error={
                    errors.name?.type === "required" ||
                    errors.name?.type === "minLength" ||
                    errors.name?.type === "maxLength" ||
                    errors.name?.type === "pattern"
                  }
                  placeholder="Phone number"
                  className="w-full  focus:border-fresh"
                  onChange={(e) => {
                    setIsChange(true);
                  }}
                />

                {errors.phoneNumber?.type === "pattern" && (
                  <span className="text-error text-xs">
                    Invalid phone number
                  </span>
                )}
                {(errors.phoneNumber?.type === "minLength" ||
                  errors.phoneNumber?.type === "maxLength") && (
                  <span className="text-error text-xs">
                    Phone number must have 10 numbers
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              {isChange ? (
                <button
                  type="submit"
                  className="border py-3 px-5 hover:bg-black hover:text-white duration-300"
                >
                  {submitLoading ? "Loading..." : "Update profile"}
                </button>
              ) : (
                <button
                  disabled
                  className=" py-3 px-5 bg-gray text-white duration-300"
                >
                  {submitLoading ? "Loading..." : "Update profile"}
                </button>
              )}
            </div>
          </form>
          <div className="basis-1/4 max-md:basis-full">
            <div className="w-full flex justify-center mb-4">
              <img
                className="rounded-full overflow-hidden"
                src={img}
                width={100}
                height={100}
                alt=""
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <label className="custom-file-upload">
                <input onChange={handleUpload} type="file" />
                Upload Image
              </label>
            </div>
            <div className="w-full flex justify-center mt-4">
              {file ? (
                <button
                  onClick={handleClick}
                  className="border py-3 px-5 hover:bg-black hover:text-white duration-300"
                >
                  {uploadLoading ? "Loading..." : "Change image"}
                </button>
              ) : (
                <button
                  disabled
                  className=" py-3 px-5 bg-gray text-white duration-300"
                >
                  {uploadLoading ? "Loading..." : "Change image"}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <AccountDetailsSke />
      )}
    </div>
  );
}
