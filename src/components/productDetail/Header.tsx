import * as React from "react";
import { IProduct } from "../../interfaces/productInterface";
import { useNavigate } from "react-router-dom";

export interface IHeaderProps {
  product: IProduct | undefined;
}

export default function Header(props: IHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-extra-light py-10 mb-10">
      <div className="flex justify-between max-w-[1200px] max-xl:px-5 mx-auto">
        <p className="font-semibold text-lg max-sm:hidden">Product</p>
        <p>
          <span
            onClick={() => {
              navigate("/home");
              window.scrollTo(0, 0);
            }}
            className="hover:text-fresh cursor-pointer duration-300 font-semibold"
          >
            Suprema
          </span>{" "}
          /{" "}
          <span className="text-fresh cursor-pointer duration-300 font-semibold">
            {props.product?.name}
          </span>
        </p>
      </div>
    </div>
  );
}
