import * as React from "react";
import Slider from "../components/home/Slider";
import Collection from "../components/home/Collection";
import NewProduct from "../components/home/NewProduct";
import Limited from "../components/home/Limited";
import BestSellers from "../components/home/BestSellers";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import {
  getCartProduct,
  getProductsStart,
} from "../features/slice/productSlice";
import Banner from "../components/home/Banner";
import Featured from "../components/home/Featured";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const { products, cartItems, isLoading } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
      //call api
    dispatch(getProductsStart());
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      dispatch(getCartProduct(JSON.parse(cartItems)));
    }
  }, []);

  return (
    <div className="mt-[85px] max-md:mt-0">
      <Slider />
      <Collection />
      <NewProduct />
      <Limited />
      <BestSellers />
      <Banner />
      <Featured />
    </div>
  );
}
