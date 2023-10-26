import Cookies from "js-cookie";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICart } from "../../interfaces/productInterface";
import { useAppSelector } from "../../store/hooks";

export default function SubtotalInfo() {
  const token = Cookies.get("refreshToken");
  const { cartItems } = useAppSelector((state) => state.product);

  const navigate = useNavigate();
  return (
    <div className="flex gap-10 max-md:flex-wrap">
      <div className="basis-1/2 max-md:basis-full">
        <p className="text-sm mb-5">Special instructions for seller</p>
        <textarea
          placeholder="How can we help you?"
          className="w-full text-sm border border-light p-3"
          name=""
          id=""
          rows={7}
        ></textarea>
      </div>
      <div className="basis-1/2 max-md:basis-full flex items-end flex-col">
        <p className="text-lg">
          Subtotal: $
          {cartItems
            .reduce((init: number, item: ICart) => {
              if (item.product.discountPrice) {
                return init + item.quantity * item.product.discountPrice;
              } else {
                return init + item.quantity * item.product.price;
              }
            }, 0)
            .toFixed(2)}
        </p>
        <i className="text-gray text-sm mb-4">
          Taxes and shipping calculated at checkout
        </i>
        <p className="text-gray text-sm text-right mb-6">
          All charges are billed in{" "}
          <span className="text-black font-semibold"> USD</span>. While the
          content of your cart is currently displayed in , the checkout will use
          <span className="text-black font-semibold"> USD </span> at the most
          current exchange rate.
        </p>
        <button
          onClick={() => {
            token ? navigate("/checkout") : navigate("/account/login");
            window.scrollTo(0, 0);
          }}
          className="border hover:border-fresh duration-300 relative group uppercase py-3 px-10"
        >
          <p className="absolute z-20 group-hover:text-white duration-300 text-sm">
            {token ? "checkout" : "login to checkout"}
          </p>
          <p className="z-20 opacity-0 text-sm">
            {" "}
            {token ? "checkout" : "login to checkout"}
          </p>
          <span className="absolute w-0 group-hover:w-full duration-300 h-full bg-fresh top-0 z-0 left-0"></span>
        </button>
      </div>
    </div>
  );
}
