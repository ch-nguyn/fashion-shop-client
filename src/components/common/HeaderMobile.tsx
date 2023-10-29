import Cookies from "js-cookie";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCartProduct } from "../../features/slice/productSlice";
import { ICart } from "../../interfaces/productInterface";

export interface IHeaderMobileProps {}

export default function HeaderMobile(props: IHeaderMobileProps) {
  const { cartItems } = useAppSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      dispatch(getCartProduct(JSON.parse(cartItems)));
    }
  }, []);
  return (
    <div className="fixed bottom-0 left-0 md:hidden w-full bg-white h-[85px] z-30 flex items-center">
      <div
        onClick={() => {
          navigate("/home");
          window.scrollTo(0, 0);
        }}
        className="basis-1/5 flex flex-col max-sm:text-xs justify-center hover:text-fresh duration-300 items-center cursor-pointer gap-1"
      >
        <i className="fa-light fa-house text-xl"></i>
        Home
      </div>
      <div
        onClick={() => {
          navigate("/products");
          window.scrollTo(0, 0);
        }}
        className="basis-1/5 flex flex-col max-sm:text-xs justify-center hover:text-fresh duration-300 items-center cursor-pointer gap-1"
      >
        <i className="fa-light fa-store text-xl"></i>
        Shop
      </div>
      <div className="basis-1/5 flex flex-col max-sm:text-xs justify-center hover:text-fresh duration-300 items-center cursor-pointer gap-1">
        <i className="fa-light fa-search text-xl"></i>
        Search
      </div>
      <div
        onClick={() => {
          if (Cookies.get("refreshToken")) {
            navigate("/account/me/profile");
          } else {
            navigate("/account/login");
          }
          window.scrollTo(0, 0);
        }}
        className="basis-1/5 flex flex-col max-sm:text-xs justify-center hover:text-fresh duration-300 items-center cursor-pointer gap-1"
      >
        <i className="fa-light fa-user text-xl"></i>
        Account
      </div>
      <div
        onClick={() => {
          navigate("/cart");
          window.scrollTo(0, 0);
        }}
        className="basis-1/5 flex flex-col max-sm:text-xs justify-center hover:text-fresh duration-300 items-center cursor-pointer gap-1"
      >
        <span className="relative">
          <i className="fa-light fa-cart-shopping text-xl"></i>
          <span className="absolute bg-fresh text-white hover:text-white text-[8px] rounded-full -top-3 -right-2 h-5 w-5 flex items-center justify-center">
            {cartItems.reduce(
              (init: number, item: ICart) => init + item.quantity,
              0
            ) > 99
              ? "99+"
              : cartItems.reduce(
                  (init: number, item: ICart) => init + item.quantity,
                  0
                )}
          </span>
        </span>
        Cart
      </div>
    </div>
  );
}
