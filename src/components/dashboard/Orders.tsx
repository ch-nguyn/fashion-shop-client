import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import { useState, useEffect } from "react";
import { IOrder } from "../../interfaces/orderInterface";
import orderApi from "../../api/modules/orderApi";
import { AxiosResponse } from "axios";
import OrderItem from "./OrderItem";
import { useNavigate } from "react-router-dom";
import OrdersSke from "../skeleton/OrdersSke";

export interface IOrdersProps {}

export default function Orders(props: IOrdersProps) {
  const [orders, setOrders] = useState<IOrder[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    orderApi
      .getUserOrders()
      .then((res: AxiosResponse) => setOrders(res.data.orders))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div>
          {orders && orders?.length > 0 ? (
            orders?.map((order: IOrder) => (
              <div key={Math.random()}>
                <OrderItem order={order} />
              </div>
            ))
          ) : (
            <div className="">
              <p className=" text-center mb-4">You do not have any orders.</p>
              <div className="flex justify-center">
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
            </div>
          )}
        </div>
      ) : (
        <OrdersSke />
      )}
    </div>
  );
}
