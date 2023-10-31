import * as React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { getCartProduct } from "../features/slice/productSlice";
import { ICart, IProduct } from "../interfaces/productInterface";
import CartItem from "../components/cart/CartItem";
import { useNavigate } from "react-router-dom";
import SubtotalInfo from "../components/cart/SubtotalInfo";

export interface ICartProps {}

export default function Cart(props: ICartProps) {
  const { cartItems } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  return (
    <div className="">
      {cartItems.length > 0 ? (
        <div className="mt-[85px] max-md:mt-0">
          <div className="h-[50vh] max-sm:h-[40vh] flex items-center justify-center bg-fixed bg-cover bg-no-repeat bg-top bg-[url('https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/empty-cart-title-image.jpg')]">
            <p className="text-white text-7xl  max-lg:text-5xl">Cart</p>
          </div>
          <div className="mt-24 mb-24 max-sm:mt-10 mx-auto max-w-[1200px] px-14 max-md:px-8 max-sm:px-5">
            <div className="flex items-center max-md:hidden pb-4 mb-3 border-b border-light text-lg">
              <div className="basis-1/2">Product</div>
              <div className="basis-1/2 flex">
                <div className="basis-1/2 flex justify-center">Quantity</div>
                <div className="basis-1/2 flex justify-end">Total</div>
              </div>
            </div>
            <div className="border-b border-light pb-3 mb-6">
              {cartItems.map((cartItem: ICart) => (
                <CartItem
                  dispatch={dispatch}
                  cartItem={cartItem}
                  key={Math.random()}
                />
              ))}
            </div>
            <SubtotalInfo />
          </div>
        </div>
      ) : (
        <div className="py-64  mx-auto max-w-[1200px] px-14 text-center">
          <p className="text-xl uppercase mb-5">
            Your cart is currently empty.
          </p>
          <div className="text-sm text-gray mb-5">
            <p>
              Before proceed to checkout you must add some products to your
              shopping cart.
            </p>
            <p>You will find a lot of interesting products on our Website.</p>
          </div>

          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo(0, 0);
            }}
            className="border hover:border-fresh duration-300 relative group uppercase py-2 px-10"
          >
            <p className="absolute z-20 group-hover:text-white duration-300">
              go to shop
            </p>
            <p className="z-20 opacity-0">go to shop</p>
            <span className="absolute w-0 group-hover:w-full duration-300 h-full bg-fresh top-0 z-0 left-0"></span>
          </button>
        </div>
      )}
    </div>
  );
}
