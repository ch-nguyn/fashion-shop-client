import * as React from "react";
import { IOrder, OrderProduct } from "../../interfaces/orderInterface";
import { useState } from "react";

export interface IOrderItemProps {
  order: IOrder;
}

export default function OrderItem(props: IOrderItemProps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div className="mb-8 border">
      <div
        onClick={() => setIsShow(!isShow)}
        className="p-5  cursor-pointer hover:bg-light-fresh duration-300 hover:border-fresh flex items-center justify-between"
      >
        <p>Order ID: {props.order?._id}</p>
        <div className="flex items-center">
          <p className="capitalize">{props.order?.status}</p>
          <i className={`fa-solid fa-angle-${isShow ? "up" : "down"} ml-2`}></i>
        </div>
      </div>
      {isShow && (
        <div className={`px-5 py-10`}>
          {props.order?.orderItems?.map((orderItem: OrderProduct) => (
            <div
              key={Math.random()}
              className="flex justify-between items-center"
            >
              <div className="basis-1/2 flex">
                <img
                  className="w-2/5"
                  src={orderItem?.product.photo[0]}
                  alt=""
                />
                <div className="w-3/5"></div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
