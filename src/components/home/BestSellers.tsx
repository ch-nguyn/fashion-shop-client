import * as React from "react";
import HeadingHomepage from "./HeadingHomepage";
import { IProduct } from "../../interfaces/productInterface";
import ProductItem from "../common/ProductItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getCartProduct } from "../../features/slice/productSlice";

export default function BestSellers() {
  const { cartItems, products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      dispatch(getCartProduct(JSON.parse(cartItems)));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);
  return (
    <div className="max-w-[1200px] mx-auto mb-6 px-5">
      <HeadingHomepage
        title={"Best Sellers"}
        heading={"Browse Through Our Best Sellers"}
      />
      <div className="flex overflow-hidden flex-wrap">
        <div className="bais-1/2 flex max-md:flex-wrap">
          {products.slice(0, 4).map((product: IProduct) => (
            <div
              className="overflow-hidden max-md:basis-1/2 max-sm:basis-full"
              key={Math.random()}
            >
              <ProductItem dispatch={dispatch} product={product}></ProductItem>
            </div>
          ))}
        </div>
        <div className="bais-1/2 flex max-md:hidden">
          {products.slice(4, 8).map((product: IProduct) => (
            <div className="overflow-hidden" key={Math.random()}>
              <ProductItem dispatch={dispatch} product={product}></ProductItem>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
