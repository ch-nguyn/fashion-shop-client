import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { IProvince } from "../interfaces/pdwInterface";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserStart } from "../features/slice/userSlice";
import { getCartProduct } from "../features/slice/productSlice";
import { useForm } from "react-hook-form";
import Information from "../components/checkout/Information";

export interface ICheckoutProps {}

export default function Checkout(props: ICheckoutProps) {
  const { user } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserStart());
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      dispatch(getCartProduct(JSON.parse(cartItems)));
    }
  }, []);

  return (
    <div className="mt-[85px] max-md:mt-0 text-[15px]">
      <div className="w-full h-[50vh] max-sm:h-[40vh] bg-center bg-cover bg-fixed flex items-center justify-center bg-[url('https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/cartt-title-image.jpg')]">
        <p className="text-white text-7xl max-lg:text-5xl">Checkout</p>
      </div>
      <div className="mt-24 mb-24 flex max-w-[1200px] mx-auto px-5 gap-10">
        <div className="basis-3/5 ">
          <Information />
        </div>
        <div className="basis-2/5 bg-extra-light"></div>
      </div>
    </div>
  );
}
