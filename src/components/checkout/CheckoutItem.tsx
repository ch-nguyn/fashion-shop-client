import * as React from "react";
import { IProduct } from "../../interfaces/productInterface";

export interface ICheckoutItemProps {
  product: IProduct;
  quantity: number;
}

export default function CheckoutItem(props: ICheckoutItemProps) {
  return (
    <div className="flex justify-between mb-5 items-center">
      <div className="basis-3/5 flex items-center">
        <div className="w-[30%] mr-4 relative ">
          <img
            src={props.product.photo[0]}
            className="rounded-lg border border-light"
            alt=""
          />
          <span className="absolute rounded-full bg-fresh text-white -top-2 -right-2 w-5 h-5 text-center text-xs flex items-center justify-center">
            {props.quantity}
          </span>
        </div>
        <p className=" text-sm">{props.product.name}</p>
      </div>
      <div className="basis-2/5 text-end">
        $
        {props.product.discountPrice
          ? (props.product.discountPrice * props.quantity)
              .toFixed(2)
              .toLocaleString()
          : (props.product.price * props.quantity).toFixed(2).toLocaleString()}
      </div>
    </div>
  );
}
