import * as React from "react";
import { IProduct } from "../../interfaces/productInterface";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../features/slice/productSlice";

export interface IProductItemRowProps {
  product: IProduct;
  dispatch: any;
}

export default function ProductItemRow(props: IProductItemRowProps) {
  const navigate = useNavigate();
  const addSuccessfully = () => {
    toast.success("Added Successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClick: () => {
        if (window.location.pathname !== "/cart") {
          navigate("/cart");
        }
        window.scrollTo(0, 0);
      },
    });
  };
  const handleAddOne = (event: any) => {
    event.stopPropagation();
    props.dispatch(
      addToCart({
        product: props.product,
        quantity: 1,
      })
    );
    addSuccessfully();
  };
  return (
    <div
      onClick={() => {
        navigate(`/products/${props.product._id}`);
        window.scrollTo(0, 0);
      }}
      className="flex w-full mb-10 cursor-pointer mx-3 group/new-collection "
    >
      <div className="flex basis-[30%] flex-col w-full overflow-hidden object-contain relative">
        <span className="overflow-hidden">
          <img
            className="absolute top-[-100%] w-full group-hover/new-collection:top-0 duration-700"
            src={props.product?.photo[1]}
            alt=""
          />
        </span>
        {props.product.inventory > 0 ? (
          <div
            onClick={handleAddOne}
            className="z-20 absolute hover:bg-fresh group-hover/new-collection:translate-y-0 translate-y-[100%] bottom-0 duration-500 text-center uppercase text-white font-semibold bg-black w-full py-3"
          >
            <span className="mr-2">add to cart</span>
            <i className="fa-regular fa-cart-shopping "></i>
          </div>
        ) : (
          <div className="z-20 absolute hover:bg-fresh group-hover/new-collection:translate-y-0 translate-y-[100%] bottom-0 duration-500 text-center uppercase text-white font-semibold bg-black w-full py-3">
            <span className="mr-2">read more</span>
            <i className="fa-regular fa-cart-shopping "></i>
          </div>
        )}
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
        {props.product?.photo.slice(0, 1).map((photo: string) => {
          return (
            <span className="w-full " key={props.product._id}>
              <img
                className="w-full group-hover/new-collection:translate-y-[100%] duration-700"
                src={photo}
                alt=""
              ></img>
            </span>
          );
        })}
      </div>

      <div className="basis-[70%] ml-10 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-2">
            <Rating
              sx={{ fontSize: 16, color: "#0cc3ce" }}
              name="text-feedback"
              value={props.product?.averageRating}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
              }
            />
            <span className="text-sm ml-1 text-gray">
              ({props.product?.numOfReviews})
            </span>
          </div>
          <div>
            <i className="fa-light hover:text-fresh fa-heart"></i>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">{props.product.name}</h2>

        <p className="my-2 mb-4">
          <span
            className={`${
              props.product?.discountPrice && "line-through opacity-70"
            } `}
          >
            ${props.product?.price.toFixed(2).toLocaleString()}
          </span>
          {props.product?.discountPrice && (
            <span className="ml-2 underline font-normal">
              ${props.product.discountPrice.toFixed(2).toLocaleString()}
            </span>
          )}
        </p>

        <p className="text-gray pb-4 border-b-[1px] border-light mb-4">
          {props.product?.description.slice(0, 150)}...
        </p>

        <p className="text-gray mb-2">
          Categories:{" "}
          {props.product.category.map((category: string, index: number) => (
            <span
              className="capitalize hover:text-fresh duration-300"
              key={Math.random()}
            >
              {category}
              {index < props.product?.category.length - 1 && ", "}
            </span>
          ))}
        </p>

        <p className="text-gray">
          Tags:{" "}
          {props.product.tag.map((tag: string, index: number) => (
            <span
              className="capitalize hover:text-fresh duration-300"
              key={Math.random()}
            >
              {tag}
              {index < props.product?.tag.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
