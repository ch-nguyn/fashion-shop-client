export interface OrderItem {
  product: string;
  quantity: number;
}

export interface CreateOrder {
  shippingFee: number;
  cartItems: OrderItem[];
  address: string;
}
