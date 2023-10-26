import * as React from "react";
import { useNavigate } from "react-router-dom";

export interface IBannerProps {}

export default function Banner(props: IBannerProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-home-banner bg-center bg-cover bg-no-repeat mb-14 text-white">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-14 px-5">
        <h2 className="text-4xl font-semibold max-sm:text-sm">
          Free Shipping Wordwide.
        </h2>
        <div
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className=" max-sm:text-xs max-sm:px-4 max-sm:py-2 animate-[slider_1.2s_ease-in-out] uppercase tracking-[2px] leading-[53px] text-sm font-semibold px-[38px] cursor-pointer border-[1px] border-white hover:bg-black hover:border-fresh duration-300"
        >
          shop now!
        </div>
      </div>
    </div>
  );
}
