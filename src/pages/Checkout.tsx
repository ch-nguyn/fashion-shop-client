import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { IProvince } from "../interfaces/pdwInterface";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserStart } from "../features/slice/userSlice";
import { getCartProduct } from "../features/slice/productSlice";
import { useForm } from "react-hook-form";
import Information from "../components/checkout/Information";
import CheckoutProducts from "../components/checkout/CheckoutProducts";
import { IAddress } from "../interfaces/userInterface";
import { ICart } from "../interfaces/productInterface";

export interface ICheckoutProps {}

export default function Checkout(props: ICheckoutProps) {
  const { user } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.product);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUserStart());
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      dispatch(getCartProduct(JSON.parse(cartItems)));
    }
  }, []);
  const [currentAddress, setCurrentAddress] = useState<IAddress>();
  useEffect(() => {
    if (user.address) {
      setCurrentAddress(user.address[0]);
    }
  }, [user]);
  const subtotal = React.useMemo(() => {
    return cartItems.reduce((init: number, item: ICart) => {
      if (item.product.discountPrice) {
        return init + item.quantity * item.product.discountPrice;
      } else {
        return init + item.quantity * item.product.price;
      }
    }, 0);
  }, [cartItems]);

  return (
    <div className="mt-[85px] max-md:mt-0 text-[15px]">
      <div className="w-full h-[50vh] max-sm:h-[40vh] bg-center bg-cover bg-fixed flex items-center justify-center bg-[url('https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/cartt-title-image.jpg')]">
        <p className="text-white text-7xl max-lg:text-5xl">Checkout</p>
      </div>
      <div className=" mb-24 flex max-w-[1200px] mx-auto max-md:px-0 px-5 gap-10 max-md:flex-wrap-reverse max-md:gap-0">
        <div className="basis-1/2 max-md:basis-full max-md:px-5">
          <Information
            currentAddress={currentAddress}
            setCurrentAddress={setCurrentAddress}
            shippingFee={shippingFee}
          />
        </div>
        <div className="basis-1/2 bg-extra-light max-md:basis-full md:hidden">
          <div
            onClick={() => setIsShow(!isShow)}
            className="flex justify-between px-5 py-7 cursor-pointer"
          >
            <p className="text-fresh underline">
              Show order summary
              <i
                className={`fa-regular fa-angle-${
                  !isShow ? "down" : "up"
                } ml-2`}
              ></i>
            </p>
            <p className="font-semibold">
              ${(subtotal + shippingFee).toFixed(2)}
            </p>
          </div>
          <div className={`${isShow ? "block" : "hidden"}`}>
            <CheckoutProducts
              subtotal={subtotal}
              setShippingFee={setShippingFee}
              shippingFee={shippingFee}
              currentAddress={currentAddress}
            />
          </div>
        </div>
        <div className="basis-1/2 bg-extra-light max-md:hidden">
          <CheckoutProducts
            subtotal={subtotal}
            setShippingFee={setShippingFee}
            shippingFee={shippingFee}
            currentAddress={currentAddress}
          />
        </div>
      </div>
    </div>
  );
}
