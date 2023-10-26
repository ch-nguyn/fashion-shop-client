import { CircularProgress, Rating, TextField } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../../interfaces/productInterface";
import CloseButton from "../common/CloseButton";
import reviewApi from "../../api/modules/reviewApi";
import { useState } from "react";
import { AxiosResponse } from "axios";
import Swal from "sweetalert2";

export interface IReviewFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  product: IProduct;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
  isReview: boolean;
}

export default function ReviewForm(props: IReviewFormProps) {
  const [rating, setRating] = useState<number | null>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data: any) => {
    setIsLoading(true);
    reviewApi
      .createReview({
        title: data.title,
        comment: data.comment,
        rating: rating,
        product: props.product._id,
      })
      .then((res: AxiosResponse) => {
        Swal.fire(
          "Success!",
          "Thank you for reviewing this product!",
          "success"
        ).then(() => {
          props.setShowForm(false);
          props.setIsReview(!props.isReview);
        });
      })
      .catch((e) => {
        Swal.fire("Oops...!", e.response.data.message, "error");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 ">
      <div
        onClick={() => props.setShowForm(false)}
        className="fixed top-0 left-0 w-full h-full bg-gray opacity-80"
      ></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed top-1/2 animate-[slip_0.5s_ease-in-out] left-1/2 w-1/2 max-sm:overflow-y-scroll max-xl:w-2/3 max-sm:w-full max-sm:h-full translate-x-[-50%] translate-y-[-50%] bg-white px-8 pb-10 pt-14"
      >
        <div className="relative">
          <div
            onClick={() => props.setShowForm(false)}
            className="group/x absolute -top-10 -right-5 border border-light rounded-full"
          >
            <CloseButton />
          </div>
          <div className="mb-10 flex gap-6 max-sm:flex-wrap">
            <div className="basis-1/3 relative overflow-hidden max-sm:basis-full">
              <img className="w-full" src={props.product?.photo[0]} alt="" />
              {props.product?.discountPrice && (
                <div className="absolute z-10 text-xs uppercase text-white bg-fresh right-0 px-12 py-1 font-semibold rotate-45 top-0 translate-y-5 translate-x-8">
                  sale!
                </div>
              )}
              {!props.product?.inventory && (
                <div className="absolute text-xs z-10 uppercase text-white bg-black right-[-35px] px-10 py-1 font-semibold rotate-45 top-[28px] translate-y-1 translate-x-2">
                  out of stock!
                </div>
              )}
            </div>
            <div className="basis-2/3  max-sm:basis-full">
              <h3 className="text-xl m2-3">{props.product?.name}</h3>
              <p className="my-2 text-sm">
                <span
                  className={`${
                    props.product?.discountPrice && "line-through opacity-70"
                  } `}
                >
                  ${props.product.price.toFixed(2).toLocaleString()}
                </span>
                {props.product?.discountPrice && (
                  <span className="ml-2 underline font-normal">
                    ${props.product.discountPrice.toFixed(2).toLocaleString()}
                  </span>
                )}
              </p>
              <p className="text-gray text-sm">
                {props.product.description.slice(0, 100)}...
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p>Rate this product</p>
            <Rating
              sx={{ color: "#0cc3ce", fontSize: 18 }}
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>

          <div className="mb-4">
            <TextField
              {...register("title", {
                required: true,
              })}
              error={errors.title?.type === "required"}
              onChange={(e) => setValue("title", e.target.value)}
              className="w-full outline-none"
              label="Title"
              variant="outlined"
            />
            {errors.title?.type === "required" && (
              <span className="text-error text-xs">Title is required</span>
            )}
          </div>

          <div className="mb-6">
            <TextField
              {...register("comment", {
                required: true,
              })}
              error={errors.comment?.type === "required"}
              onChange={(e) => setValue("comment", e.target.value)}
              className="w-full outline-none"
              label="Comment"
              variant="outlined"
              rows={5}
              multiline
            />
            {errors.comment?.type === "required" && (
              <span className="text-error text-xs">Comment is required</span>
            )}
          </div>

          <button
            type={isLoading ? "button" : "submit"}
            className="text-center flex justify-center items-center w-full bg-black text-white hover:bg-fresh duration-300 uppercase py-3"
          >
            {isLoading ? <CircularProgress size={24} /> : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
