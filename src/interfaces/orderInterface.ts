import { IProduct } from "./productInterface";

export interface OrderItem {
  product: string;
  quantity: number;
}

export interface CreateOrder {
  shippingFee: number;
  cartItems: OrderItem[];
  address: string;
  isPaid?: boolean;
}

export interface OrderProduct {
  _id: string;
  quantity: number;
  product: IProduct;
  price: number;
}

export interface IOrder {
  status: string;
  createdAt: string;
  _id: string;
  isPaid: boolean;
  shippingFee: number;
  subtotal: number;
  total: number;
  orderItems: OrderProduct[];
}
