import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import { ICart } from "../../interfaces/productInterface";
import CheckoutItem from "./CheckoutItem";

export interface ICheckoutProductsProps {}

export default function CheckoutProducts(props: ICheckoutProductsProps) {
  const { cartItems } = useAppSelector((state) => state.product);
  return (
    <div className="py-14 px-10 ">
      {cartItems?.map((item: ICart) => (
        <div key={Math.random()}>
          <CheckoutItem quantity={item.quantity} product={item.product} />
        </div>
      ))}
    </div>
  );
}
