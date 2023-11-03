import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ICart, IProduct } from "../../interfaces/productInterface";
import { IFilter } from "../../interfaces/filterInterface";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart, getCartProduct } from "../../features/slice/productSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
export interface IProductItemProps {
  product: IProduct;
  filter?: IFilter;
  setFilter?: React.Dispatch<React.SetStateAction<IFilter>>;
  dispatch: any;
}

function ProductItem(props: IProductItemProps) {
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
        navigate(`/products/${props.product?._id}`);
        window.scrollTo(0, 0);
      }}
      className="mb-10 mx-3 max-sm:mx-1 pb-4  relative border-light cursor-pointer group/new-collection "
    >
      <span>
        <img
          className="absolute top-[-71%] w-full group-hover/new-collection:top-0 duration-700"
          src={props.product?.photo[1]}
          alt=""
        />
      </span>
      <div className="flex flex-col w-full overflow-hidden object-contain relative">
        {props.product?.inventory > 0 ? (
          <div
            onClick={handleAddOne}
            className="z-20 absolute hover:bg-fresh group-hover/new-collection:translate-y-0 translate-y-[100%] bottom-0 duration-500 text-center uppercase text-white font-semibold bg-black w-full py-3"
          >
            <span className="mr-2">add to cart</span>
            <i className="fa-regular fa-cart-shopping z-50 "></i>
          </div>
        ) : (
          <div className="z-20 absolute hover:bg-fresh group-hover/new-collection:translate-y-0 translate-y-[100%] bottom-0 duration-500 text-center uppercase text-white font-semibold bg-black w-full py-3">
            <span className="mr-2">Read more</span>
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

      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-4 mb-2">
            <Rating
              sx={{ fontSize: 14, color: "#0cc3ce" }}
              name="text-feedback"
              value={props.product?.averageRating}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.6 }} fontSize="inherit" />
              }
            />
            <span className="text-xs ml-1 text-gray">
              ({props.product?.numOfReviews})
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <p className="text-xs capitalize opacity-80">
            {props.product?.category
              .slice(0, 3)
              .map((category: string, index: number) => (
                <span
                  onClick={function filterCategory(e) {
                    e.stopPropagation();
                    if (
                      window.location.href !== "http://localhost:3000/products"
                    ) {
                      navigate("/products");
                      window.scrollTo(0, 0);
                    }
                    if (props.setFilter && props.filter) {
                      props.setFilter({ ...props.filter, category: category });
                    }
                  }}
                  className="hover:text-fresh duration-300"
                  key={Math.random()}
                >
                  {category}
                  {index < props.product?.category.length - 1 && ", "}
                </span>
              ))}
          </p>
        </div>
        <div className="group/slide-product">
          <p className="mt-2 font-semibold group-hover/slide-product:opacity-50 duration-300">
            {props.product?.name}
          </p>
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
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductItem);
