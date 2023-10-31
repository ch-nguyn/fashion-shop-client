import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import { ICart } from "../../interfaces/productInterface";
import CheckoutItem from "./CheckoutItem";
import { IAddress } from "../../interfaces/userInterface";
import { useEffect, useState } from "react";

export interface ICheckoutProductsProps {
  currentAddress: IAddress | undefined;
  shippingFee: number;
  setShippingFee: React.Dispatch<React.SetStateAction<number>>;
  subtotal: number;
}

export default function CheckoutProducts(props: ICheckoutProductsProps) {
  const { cartItems } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (props.currentAddress?.province === "Thành phố Hà Nội") {
      props.setShippingFee(0);
    } else {
      props.setShippingFee(5);
    }
  }, [props.currentAddress]);

  return (
    <div className="py-14 px-10 max-md:px-5 max-md:py-2 max-md:pb-10 ">
      <div className="mb-10">
        {cartItems?.map((item: ICart) => (
          <div key={Math.random()}>
            <CheckoutItem quantity={item.quantity} product={item.product} />
          </div>
        ))}
      </div>
      <div className="text-sm">
        <div className="flex justify-between mb-2">
          <p>Subtotal</p>
          <p className="font-semibold ">${props.subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Shipping</p>
          {props.shippingFee === 0 ? (
            <p>Free</p>
          ) : (
            <p>${props.shippingFee.toFixed(2)}</p>
          )}
        </div>
        <div className="flex justify-between mb-2 text-lg font-semibold">
          <p>Total</p>
          <p>${(props.subtotal + props.shippingFee).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
