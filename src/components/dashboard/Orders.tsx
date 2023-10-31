import * as React from "react";
import { useAppSelector } from "../../store/hooks";

export interface IOrdersProps {}

export default function Orders(props: IOrdersProps) {
  const { user } = useAppSelector((state) => state.user);
  return <div></div>;
}
