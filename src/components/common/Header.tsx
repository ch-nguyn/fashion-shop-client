import Cookies from "js-cookie";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { getCartProduct } from "../../features/slice/productSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ICart } from "../../interfaces/productInterface";

export default function Header() {
  const [headerEls, setHeaderEls] = useState<string[]>([
    "home",
    "products",
    "about",
    "contact",
  ]);
  const navigate = useNavigate();
  const { cartItems } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      dispatch(getCartProduct(JSON.parse(cartItems)));
    }
  }, []);

  return (
    <header className="h-[85px] px-[30px] flex items-center max-md:hidden justify-between fixed w-full top-0 z-40 bg-white">
      <div className="h-full cursor-pointer">
        <img
          onClick={() => {
            navigate("/home");
            window.scrollTo(0, 0);
          }}
          className="h-full"
          src="https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/logo-dark.png"
          alt=""
        />
      </div>
      <div className="flex h-full items-center">
        <div className="font-[600]  flex ">
          {headerEls.map((el) => (
            <div
              key={Math.random()}
              onClick={() => {
                navigate(`/${el}`);
                window.scrollTo(0, 0);
              }}
              className="relative basis-1/4 cursor-pointer group/header"
            >
              <NavLink
                className="px-5 duration-200 capitalize group-hover/header:text-fresh cursor-pointer leading-[85px]"
                to={`/${el}`}
              >
                {el}
              </NavLink>
              <NavLink
                className={`absolute left-0 bottom-0 py-[2px] w-full bg-fresh opacity-0 ${
                  window.location.href.includes("/shop") && el === "shop"
                    ? "opacity-100"
                    : ""
                }`}
                to={`/${el}`}
              ></NavLink>
              <span
                className={`absolute left-0 bottom-0 h-1 group-hover/header:w-full w-0 duration-500 bg-fresh `}
              ></span>
            </div>
          ))}
        </div>
        <div className="flex gap-8 ml-4 items-center text-xl">
          <span className=" duration-200 hover:text-fresh cursor-pointer leading-[85px]">
            <i className="fa-regular fa-magnifying-glass fa-rotate-90"></i>
          </span>
          <span
            onClick={() => {
              navigate("/cart");
              window.scrollTo(0, 0);
            }}
            className=" duration-200 relative hover:text-fresh cursor-pointer leading-[85px]"
          >
            <span className="absolute bg-fresh text-white hover:text-white text-[10px] rounded-full top-6 -right-3 h-5 w-5 flex items-center justify-center">
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
            <i className="fa-regular fa-bag-shopping"></i>
          </span>
          <span
            onClick={() => {
              Cookies.get("refreshToken")
                ? navigate("/account/me/profile")
                : navigate("/account/login");
              window.scrollTo(0, 0);
            }}
            className=" duration-200 hover:text-fresh cursor-pointer leading-[85px]"
          >
            <i className="fa-regular fa-user"></i>
          </span>
        </div>
      </div>
    </header>
  );
}
