import * as React from "react";

export interface IPaymentItemProps {
  icon: string;
  payment: string;
  setPayment: React.Dispatch<React.SetStateAction<string>>;
  paymentMethod: string;
}

export default function PaymentItem(props: IPaymentItemProps) {
  return (
    <div
      onClick={() => props.setPayment(props.paymentMethod)}
      className={`p-4 border cursor-pointer rounded flex ${
        props.payment === props.paymentMethod
          ? "border-fresh bg-light-fresh"
          : "border-light"
      } justify-between items-center mb-3`}
    >
      <div className="flex gap-2">
        <div
          className={`relative  ${
            props.payment === props.paymentMethod
              ? "bg-fresh"
              : "border-light border"
          } rounded-full w-5 h-5`}
        >
          <div className="absolute rounded-full w-2 h-2 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white"></div>
        </div>
        <p className="capitalize">Payment on {props.paymentMethod}</p>
      </div>
      <i
        className={`${props.icon} ${
          props.payment === props.paymentMethod && "text-fresh"
        }`}
      ></i>
    </div>
  );
}
