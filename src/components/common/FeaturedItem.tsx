import * as React from "react";
import { IProduct } from "../../interfaces/productInterface";
import { useNavigate } from "react-router-dom";

export interface IFeaturedItemProps {
  title: string;
  products: IProduct[];
}

export default function FeaturedItem(props: IFeaturedItemProps) {
  const navigate = useNavigate();
  return (
    <div className="basis-1/3 px-5 max-md:mb-8">
      <div className="flex items-center mb-11 max-md:mb-3">
        <p className="font-semibold text-xl capitalize mr-4">{props.title}</p>
        <div className="basis-full border-b-2 border-light"></div>
      </div>
      <div className="flex flex-col gap-4">
        {props.products?.map((product: IProduct) => (
          <div
            key={Math.random()}
            onClick={() => {
              navigate(`/products/${product._id}`);
              window.scrollTo(0, 0);
            }}
            className="flex  cursor-pointer hover:opacity-60"
          >
            <div className="basis-[20%] mr-4">
              <img className="w-full" src={product.photo[0]} alt="" />
            </div>
            <div className="basis-[90%] font-medium">
              <p>{product.name}</p>
              <p className="capitalize text-xs text-gray mt-1">
                {product.category.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
