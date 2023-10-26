import * as React from "react";
import { NavigateFunction } from "react-router-dom";

export interface IProductHeaderProps {
  navigate: NavigateFunction;
}

export default function ProductHeader(props: IProductHeaderProps) {
  return (
    <div className="h-[50vh] max-sm:h-[40vh]  flex justify-center items-center flex-col">
      <h2 className="text-7xl mb-8  cursor-default max-sm:text-5xl">
        Products
      </h2>
      <div className="flex text-gray items-center">
        <span
          onClick={() => {
            props.navigate("/home");
            window.scrollTo(0, 0);
          }}
          className="text-lg cursor-pointer hover:text-fresh duration-300"
        >
          Home
        </span>
        <i className="fa-light fa-angle-right mx-2"></i>
        <span className="text-lg cursor-default">Products</span>
      </div>
    </div>
  );
}
