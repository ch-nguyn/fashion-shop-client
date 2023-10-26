import * as React from "react";
import { IProduct } from "../../interfaces/productInterface";
import { IReview } from "../../interfaces/reviewInterface";
import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import authApi from "../../api/modules/authApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IUser } from "../../interfaces/userInterface";
import ReviewForm from "./ReviewForm";
import ReviewEditForm from "./ReviewEditForm";

export interface IReviewProps {
  product: IProduct;
  user: IUser;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
  isReview: boolean;
}

export default function Review(props: IReviewProps) {
  const [numReviews, setNumReviews] = useState<number>(100);
  const [token, setToken] = useState(Cookies.get("refreshToken"));
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [sortReview, setSortReview] = useState<IReview[]>([]);

  useEffect(() => {
    const include = props.product.reviews.filter(
      (review: IReview) => review.user.name === props.user.name
    );
    const notInclude = props.product.reviews.filter(
      (review: IReview) => review.user.name !== props.user.name
    );
    setSortReview([...include, ...notInclude]);
  }, [props.product.reviews]);

  return (
    <div>
      {showForm && (
        <ReviewForm
          isReview={props.isReview}
          setIsReview={props.setIsReview}
          product={props.product}
          setShowForm={setShowForm}
        />
      )}
      {sortReview.slice(0, numReviews).map((review: IReview) => (
        <ReviewItem
          showEditForm={showEditForm}
          product={props.product}
          setIsReview={props.setIsReview}
          isReview={props.isReview}
          user={props.user}
          key={Math.random()}
          review={review}
          setShowEditForm={setShowEditForm}
        ></ReviewItem>
      ))}
      {props.product.reviews.length !== 0 ? (
        <></>
      ) : (
        <p className="mb-6">
          There's no review. Let's be the first user review this product!
        </p>
      )}
      {token ? (
        props.product.reviews.filter(
          (review: IReview) => review.user._id === props.user._id
        ).length ? (
          <></>
        ) : (
          <div className="flex justify-end mb-10">
            <div
              onClick={() => setShowForm(true)}
              className="relative border border-black py-3  px-5 cursor-pointer group hover:border-fresh hover:bg-fresh duration-300"
            >
              <p className="z-20 group-hover:text-white duration-300 uppercase">
                Write your review
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="flex justify-end mb-10">
          <div
            onClick={() => {
              navigate("/account/login");
              window.scrollTo(0, 0);
            }}
            className="relative border border-black py-3  px-5 cursor-pointer group hover:border-fresh hover:bg-fresh duration-300"
          >
            <p className="z-20 group-hover:text-white duration-300 uppercase">
              Login to review
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
