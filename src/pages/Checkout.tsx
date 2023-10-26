import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { IProvince } from "../interfaces/pdwInterface";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserStart } from "../features/slice/userSlice";
import { getCartProduct } from "../features/slice/productSlice";

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
    <div className="mt-[85px] max-md:mt-0">
      <div className="w-full h-[50vh] max-sm:h-[40vh] bg-center bg-cover bg-fixed flex items-center justify-center bg-[url('https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/cartt-title-image.jpg')]">
        <p className="text-white text-7xl max-lg:text-5xl">Checkout</p>
      </div>
      <div className="my-24"></div>
    </div>
  );
}
