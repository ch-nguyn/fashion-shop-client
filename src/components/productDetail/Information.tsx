import * as React from "react";
import { useState } from "react";
import { IProduct } from "../../interfaces/productInterface";
import Review from "./Review";
import { IUser } from "../../interfaces/userInterface";

export interface IInformationProps {
  product: IProduct;
  isReview: boolean;
  user: IUser;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Information(props: IInformationProps) {
  const [currentInf, setCurrentInf] = useState<
    "description" | "information" | "reviews"
  >("description");

  return (
    <div className="max-w-[1200px] mx-auto flex gap-8 mb-16 max-xl:px-5 max-md:flex-wrap  ">
      <div className="basis-1/3 max-md:basis-full">
        <div
          onClick={() => setCurrentInf("description")}
          className={`${
            currentInf === "description" ? "bg-white" : "bg-extra-light"
          } px-5 cursor-pointer py-4 capitalize border-l-fresh mb-3 group/des duration-300 relative`}
        >
          description
          <span
            className={`absolute w-[4px] bg-fresh group-hover/des:h-full ${
              currentInf === "description" ? "h-full" : "h-0"
            } top-0 left-0 duration-500`}
          ></span>
        </div>
        <div
          onClick={() => setCurrentInf("information")}
          className={`${
            currentInf === "information" ? "bg-white" : "bg-extra-light"
          } px-5 cursor-pointer py-4 relative group capitalize border-l-fresh duration-300 mb-3`}
        >
          additional information
          <span
            className={`absolute w-[4px] bg-fresh group-hover:h-full ${
              currentInf === "information" ? "h-full" : "h-0"
            } top-0 left-0 duration-500`}
          ></span>
        </div>
        <div
          onClick={() => setCurrentInf("reviews")}
          className={`${
            currentInf === "reviews" ? "bg-white" : "bg-extra-light"
          } px-5 cursor-pointer py-4 relative capitalize group border-l-fresh duration-300 mb-3`}
        >
          reviews ({props.product.numOfReviews})
          <span
            className={`absolute w-[4px] bg-fresh group-hover:h-full ${
              currentInf === "reviews" ? "h-full" : "h-0"
            } top-0 left-0 duration-500`}
          ></span>
        </div>
      </div>
      <div className="basis-2/3  max-md:basis-full">
        {currentInf === "description" && (
          <div>
            <h3 className="font-semibold text-xl mb-5">
              What are the payment options?
            </h3>
            <p className="leading-[26px] text-sm text-justify">
              {props.product.description}
            </p>
          </div>
        )}{" "}
        {currentInf === "information" && (
          <div className="flex">
            <div className="basis-1/2 border-x border-light">
              <div className="flex py-4 justify-center items-center font-semibold text-[15px] border-t border-light">
                Weight
              </div>
              <div className="flex py-4 justify-center items-center font-semibold text-[15px] border-t border-light">
                Dimentions
              </div>
              <div className="flex py-4 justify-center items-center font-semibold text-[15px] border-t border-light">
                Colors
              </div>
              <div className="flex py-4 justify-center items-center font-semibold text-[15px] border-y border-light">
                Sizes
              </div>
            </div>
            <div className="basis-1/2 border-r border-light">
              <div className="flex py-4 justify-center items-center text-[15px] border-t border-light">
                1kg
              </div>
              <div className="flex py-4 justify-center items-center text-[15px] border-t border-light">
                5 x 6 x 7 cm
              </div>
              <div className="flex py-4 justify-center items-center text-[15px] capitalize border-t border-light">
                {props.product?.color.join(", ")}
              </div>
              <div className="flex py-4 justify-center items-center text-[15px] uppercase border-y border-light">
                {props.product?.size.join(", ")}
              </div>
            </div>
          </div>
        )}
        {currentInf === "reviews" && (
          <Review
            isReview={props.isReview}
            setIsReview={props.setIsReview}
            user={props.user}
            product={props.product}
          />
        )}
      </div>
    </div>
  );
}
