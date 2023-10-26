import * as React from "react";
import { IReview } from "../../interfaces/reviewInterface";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import { IUser } from "../../interfaces/userInterface";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import reviewApi from "../../api/modules/reviewApi";
import { AxiosResponse } from "axios";
import ReviewEditForm from "./ReviewEditForm";
import { IProduct } from "../../interfaces/productInterface";

export interface IReviewItemProps {
  review: IReview;
  user: IUser;
  isReview: boolean;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
  product: IProduct;
  showEditForm: boolean;
}

export default function ReviewItem(props: IReviewItemProps) {
  const [localUser, setLocalUser] = useState<IUser>();
  const token = Cookies.get("refreshToken");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0cc3ce",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        reviewApi
          .deleteReview(props.review._id)
          .then((res: AxiosResponse) => {
            Swal.fire("Deleted!", "Your review has been deleted!", "success");
            props.setIsReview(!props.isReview);
          })
          .catch((e) => {
            Swal.fire("Oops...!", e.response.data.message, "error");
          })
          .finally(() => setIsLoading(false));
      }
    });
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      setLocalUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className="">
      {props.showEditForm &&
      token &&
      localUser?.name === props.review.user.name ? (
        <ReviewEditForm
          review={props.review}
          isReview={props.isReview}
          setIsReview={props.setIsReview}
          product={props.product}
          setShowEditForm={props.setShowEditForm}
        />
      ) : (
        <></>
      )}
      <div className="flex mb-10 gap-5  pb-4">
        <div className="basis-[10%] overflow-hidden ">
          <img
            className="rounded-full w-full"
            src={props.review?.user?.photo}
            alt=""
          />
        </div>
        <div className="basis-[90%]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <p className="font-semibold">{props.review?.user?.name} </p>
              <i className="fa-light fa-hyphen mx-1"></i>
              <p className="text-gray opacity-80 text-sm">
                {String(
                  new Date(props.review?.createAt)
                    .toISOString()
                    .substring(0, 10)
                    .replaceAll("-", "/")
                )}
              </p>
            </div>
            {token && localUser?.name === props.review.user.name ? (
              <div className="flex gap-5 max-sm:hidden">
                <p
                  onClick={() => props.setShowEditForm(true)}
                  className="text-fresh underline cursor-pointer"
                >
                  Edit
                  <i className="ml-1 fa-light fa-pen-to-square"></i>
                </p>
                <p
                  onClick={handleDelete}
                  className="text-error underline cursor-pointer"
                >
                  Delete
                  <i className="ml-1 fa-light fa-trash"></i>
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>

          <Rating
            sx={{ fontSize: 16, color: "#0cc3ce" }}
            name="text-feedback"
            value={props.review?.rating}
            readOnly
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />}
          />
          <p className="text-xl ">{props.review?.title}</p>
          <p>{props.review?.comment}</p>
          {token && localUser?.name === props.review.user.name ? (
            <div className="max-sm:flex hidden gap-5 mt-3">
              <p
                onClick={() => props.setShowEditForm(true)}
                className="text-fresh underline cursor-pointer"
              >
                Edit
                <i className="ml-1 fa-light fa-pen-to-square"></i>
              </p>
              <p
                onClick={handleDelete}
                className="text-error underline cursor-pointer"
              >
                Delete
                <i className="ml-1 fa-light fa-trash"></i>
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
