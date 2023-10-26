import * as React from "react";
import FeaturedItem from "../common/FeaturedItem";
import { IProduct } from "../../interfaces/productInterface";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function Featured() {
  const navigate = useNavigate();
  const { products } = useAppSelector((state) => state.product);
  return (
    <div className="max-w-[1200px] mx-auto flex max-md:mb-28 max-md:mt-0 mt-28 mb-28 max-md:block">
      <FeaturedItem
        title={"featured"}
        products={products
          ?.filter((product: IProduct) =>
            product.category.includes("accessories")
          )
          .slice(0, 3)}
      />
      <FeaturedItem
        title={"sale"}
        products={products
          ?.filter((product: IProduct) => product.discountPrice)
          .slice(0, 3)}
      />
      <div className="basis-1/3 px-4">
        <div className="flex items-center mb-11 max-md:mb-3">
          <p className="font-semibold text-xl capitalize mr-4">Trending</p>
          <div className="basis-full border-b-2 border-light"></div>
        </div>
        <img
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="w-full cursor-pointer"
          src="https://suprema.qodeinteractive.com/wp-content/uploads/2016/02/home-shop-1-banner-1.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
