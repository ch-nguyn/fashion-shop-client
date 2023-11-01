import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import { useState, useEffect } from "react";
import { IOrder } from "../../interfaces/orderInterface";
import orderApi from "../../api/modules/orderApi";
import { AxiosResponse } from "axios";
import OrderItem from "./OrderItem";

export interface IOrdersProps {}

export default function Orders(props: IOrdersProps) {
  const [orders, setOrders] = useState<IOrder[]>();
  useEffect(() => {
    orderApi
      .getUserOrders()
      .then((res: AxiosResponse) => setOrders(res.data.orders));
  }, []);

  return (
    <div>
      {orders?.map((order: IOrder) => (
        <div key={Math.random()}>
          <OrderItem order={order} />
        </div>
      ))}
    </div>
  );
}
