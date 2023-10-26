import * as React from "react";
import { useNavigate } from "react-router-dom";

export interface IHomeBtnProps {}

export default function HomeBtn(props: IHomeBtnProps) {
  const navigate = useNavigate();
  return (
    <div className="flex text-white items-center">
      <div
        onClick={() => {
          navigate("/products");
          window.scrollTo(0, 0);
        }}
        className="animate-[slider_1.8s_ease-in-out] max-sm:text-[10px] max-sm:leading-8 max-lg:text-[12px] uppercase max-lg:px-5 max-lg:leading-10 tracking-[2px] leading-[53px] text-sm font-semibold px-[38px] cursor-pointer max-md:mt-5 mt-[40px] mr-2 bg-fresh hover:bg-black duration-300"
      >
        find out more
      </div>
      <div
        onClick={() => {
          navigate("/products");
          window.scrollTo(0, 0);
        }}
        className="animate-[slider_1.8s_ease-in-out] max-sm:text-[10px] max-sm:leading-8 uppercase max-lg:text-[12px] max-lg:px-5 max-lg:leading-10 tracking-[2px] leading-[53px] text-sm font-semibold px-[38px] cursor-pointer max-md:mt-5 mt-[40px] border-[1px] border-white hover:bg-fresh hover:border-fresh duration-300"
      >
        shop now!
      </div>
    </div>
  );
}
