import * as React from "react";
import { IOrder, OrderProduct } from "../../interfaces/orderInterface";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";

export interface IOrderItemProps {
  order: IOrder;
}

export default function OrderItem(props: IOrderItemProps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="mb-8 border">
      <div
        onClick={() => setIsShow(!isShow)}
        className="p-5  cursor-pointer hover:bg-light-fresh duration-300 hover:border-fresh flex items-center justify-between"
      >
        <p>Order ID: {props.order?._id}</p>
        <div className="flex items-center">
          <p
            className={`capitalize px-2 py-1 ${
              props.order?.status === "failed" && "bg-error"
            } ${props.order?.status === "pending" && "bg-warn"} ${
              props.order?.status === "delivering" && "bg-delivering"
            } ${
              props.order?.status === "delivered" && "bg-success"
            } text-white rounded`}
          >
            {props.order?.status}
          </p>

          <i className={`fa-solid fa-angle-${isShow ? "up" : "down"} ml-4`}></i>
        </div>
      </div>
      {isShow && (
        <div className={`px-5 py-3`}>
          <div className=" flex flex-col gap-1">
            <p>Username: {user.name}</p>
            <p>Phone number: {user.phoneNumber}</p>
            <p>Address: {props.order?.address}</p>
            <p className="capitalize">
              Payment: {props.order.isPaid ? "by paypal" : "on delivering"}
            </p>
          </div>
          <div className="my-8">
            {props.order?.orderItems?.map((orderItem: OrderProduct) => (
              <div
                key={Math.random()}
                className="flex justify-between items-center mb-4"
              >
                <div className="basis-1/2 flex gap-5 items-center">
                  <img
                    className="w-2/5"
                    src={orderItem?.product.photo[0]}
                    alt=""
                  />
                  <div className="basis-full flex flex-col gap-2">
                    <p>{orderItem.product.name}</p>
                    <p>x{orderItem.quantity}</p>
                  </div>
                </div>
                <div className="basis-1/2 justify-end text-end">
                  ${orderItem.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1  pb-6">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>
                $
                {props.order?.orderItems
                  .reduce((init, item) => init + item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Shipping:</p>
              <p>
                {props.order?.shippingFee === 0
                  ? "Free"
                  : `$${props.order?.shippingFee.toFixed(2)}`}
              </p>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <p>Total:</p>
              <p>${props.order?.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
