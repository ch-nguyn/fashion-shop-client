import * as React from "react";

export interface IProductDetailSkeProps {}

export default function ProductDetailSke(props: IProductDetailSkeProps) {
  return (
    <div className="animate-pulse w-full flex gap-5 max-md:flex-wrap max-xl:px-5 max-w-[1200px] mx-auto mb-20">
      <div className="basis-[60%] flex gap-5 max-md:basis-full max-sm:gap-0">
        <div className="basis-[20%] max-sm:basis-0 flex flex-col gap-2">
          <div className="w-full pb-[100%] bg-light"></div>
          <div className="w-full pb-[100%] bg-light"></div>
          <div className="w-full pb-[100%] bg-light"></div>
        </div>
        <div className="basis-[80%] max-sm:basis-full flex flex-col gap-2">
          <div className="w-full pb-[100%] bg-light"></div>
        </div>
      </div>
      <div className="basis-[40%] max-md:basis-full">
        <div className="w-full h-8 bg-light mb-3"></div>
        <div className="bg-light w-20 h-7 mb-5"></div>
        <div className="w-full h-20 bg-light mb-8"></div>
        <div className="w-28 h-6 bg-light mb-2"></div>
        <div className="w-full h-6 bg-light mb-2"></div>
        <div className="w-40 h-6 bg-light mb-11"></div>
        <div className="flex gap-5 mb-7">
          <div className="basis-1/4 h-12 bg-light"></div>
          <div className="basis-3/4 h-12 bg-light"></div>
        </div>
      </div>
    </div>
  );
}
