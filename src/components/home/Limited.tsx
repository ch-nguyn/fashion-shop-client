import * as React from "react";
import HomeBtn from "./HomeBtn";

export interface ILimitedProps {}

export default function Limited(props: ILimitedProps) {
  return (
    <>
      <div className="text-white py-24 flex  flex-col items-center justify-center bg-limited-shop bg-cover bg-no-repeat bg-center bg-fixed">
        <div className="max-sm:px-5">
          <h2 className="text-6xl font-semibold leading-[60px] mb-5 max-lg:text-5xl max-sm:text-4xl text-center">
            Shop Limited Edition.
          </h2>
          <p className="leading-[35px] text-xl mb-1 max-lg:text-sm max-sm:text-xs text-center">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy
          </p>
          <p className="leading-[35px] text-xl max-lg:text-sm max-sm:text-xs text-center">
            nibh euismod tincidunt ut laoreet dolore.
          </p>
        </div>
        <HomeBtn />
      </div>
    </>
  );
}
