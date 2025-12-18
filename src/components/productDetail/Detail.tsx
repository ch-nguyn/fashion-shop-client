/* eslint-disable react-hooks/exhaustive-deps */
import { IProduct } from "../../interfaces/productInterface";
import { useCallback, useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart, getCartProduct } from "../../features/slice/productSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface IDetailProps {
  product: IProduct;
}

export default function Detail(props: IDetailProps) {
  const [currentImg, setCurrentImg] = useState<string>("");
  const [numProducts, setNumProducts] = useState<number>(1);
  const { cartItems } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setCurrentImg(props.product?.photo[0]);
  }, [props.product]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      dispatch(getCartProduct(JSON.parse(cartItems)));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (props.product?.inventory === 0) {
    } else {
      if (numProducts > props.product?.inventory) {
        setNumProducts(props.product?.inventory);
      }
      if (numProducts < 1) {
        setNumProducts(1);
      }
    }
  }, [numProducts]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: props.product,
        quantity: numProducts,
      })
    );
    setNumProducts(0);
    addSuccessfully();
  };
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

  return (
    <>
      <div className="flex gap-5 relative max-w-[1200px] mx-auto mb-10 max-xl:px-5 max-md:flex-wrap max-md:gap-10">
        <div className="basis-[60%] flex gap-5 max-md:basis-full max-sm:gap-0">
          <div className="basis-[20%] max-sm:basis-0">
            {props.product?.photo?.map((photo: string) => (
              <div
                onClick={() => setCurrentImg(photo)}
                key={Math.random()}
                className="mb-3"
              >
                <img
                  src={photo}
                  className={`w-full hover:opacity-100 cursor-pointer ${
                    currentImg === photo ? "opacity-100" : "opacity-30"
                  }`}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="basis-[80%] max-sm:basis-full relative overflow-hidden">
            <img className="w-full" src={currentImg} alt="" />
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
        </div>
        <div className="basis-[40%]  max-md:basis-full">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold">{props.product?.name}</h2>
            <div className="flex items-center">
              <Rating
                sx={{ fontSize: 20, color: "#0cc3ce" }}
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
          </div>
          <div className="flex text-gray text-xl mb-4 font-semibold">
            <p
              className={`${
                props.product?.discountPrice && "opacity-60 line-through mr-2"
              }`}
            >
              ${props.product?.price.toFixed(2).toLocaleString()}
            </p>
            {props.product?.discountPrice && (
              <p className="underline">
                ${props.product?.discountPrice.toFixed(2).toLocaleString()}
              </p>
            )}
          </div>
          <p className=" text-sm text-gray mb-8 leading-[26px]">
            {props.product?.description.slice(0, 200)}...
          </p>
          <div className="text-[15px] mb-10">
            <p className="mb-1 font-semibold">
              Inventory:{" "}
              <span className="text-gray font-normal">
                {props.product?.inventory}
              </span>
            </p>
            <p className="mb-1 font-semibold">
              Categories:{" "}
              {props.product?.category?.map(
                (category: string, index: number) => (
                  <span
                    key={Math.random()}
                    className="text-gray font-normal hover:text-fresh capitalize"
                  >
                    {category}
                    {index < props.product?.category.length - 1 && ", "}
                  </span>
                )
              )}
            </p>
            <p className="mb-1 font-semibold">
              Tags:{" "}
              {props.product?.tag?.map((tag: string, index: number) => (
                <span
                  key={Math.random()}
                  className="text-gray font-normal hover:text-fresh capitalize"
                >
                  {tag}
                  {index < props.product?.tag.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>

          {props.product?.inventory > 0 && (
            <div className="flex gap-5 mb-6">
              <span className="flex items-center basis-[25%] border-[1px] border-light">
                <span
                  onClick={() => setNumProducts(numProducts - 1)}
                  className=" w-1/3 flex item-center justify-center cursor-pointer hover:bg-fresh hover:text-white duration-300 py-4 px-5"
                >
                  <i className="fa-solid fa-minus"></i>
                </span>

                <input
                  type="text"
                  value={numProducts}
                  onChange={(e) => setNumProducts(Number(e.target.value))}
                  className="w-1/3 outline-none text-center"
                />

                <span
                  onClick={() => setNumProducts(numProducts + 1)}
                  className="w-1/3 flex item-center justify-center cursor-pointer hover:bg-fresh hover:text-white duration-300 py-4 px-5"
                >
                  <i className="fa-solid fa-plus "></i>
                </span>
              </span>
              <div
                onClick={handleAddToCart}
                className="basis-[75%] bg-black text-white flex group/add justify-center items-center cursor-pointer relative"
              >
                <p className="uppercase z-20">Add to cart</p>
                <div className=" z-20">
                  <i className="fa-light fa-cart-shopping ml-2 "></i>
                </div>
                <div className="absolute top-0 left-0 group-hover/add:w-full h-full w-0 bg-fresh z-10 duration-500"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
