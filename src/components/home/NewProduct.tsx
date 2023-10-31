/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import HeadingHomepage from "./HeadingHomepage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCartProduct,
  getProductsStart,
} from "../../features/slice/productSlice";
import { IProduct } from "../../interfaces/productInterface";
import { useNavigate } from "react-router-dom";
import ProductItem from "../common/ProductItem";

export default function NewProduct() {
  const { cartItems, products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <div className="mx-auto max-w-[1200px] px-5 mb-6 new-prod ">
      <HeadingHomepage
        title={"New Products"}
        heading={"Shop The New Collection"}
      ></HeadingHomepage>
      <Swiper
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {products
          .filter((product: IProduct) =>
            product.category.includes("new collection")
          )
          .map((product: IProduct) => (
            <SwiperSlide key={product._id}>
              <ProductItem dispatch={dispatch} product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
