import * as React from "react";

export interface IShareProps {
  isLoading: boolean;
}

export default function Share(props: IShareProps) {
  return props.isLoading ? (
    <></>
  ) : (
    <div className="py-10 max-sm:my-8 flex items-center justify-between max-w-[1200px] mx-auto border-y-[1px] max-xl:px-5 border-light my-16">
      <div className="flex max-sm:flex-col max-sm justify-center gap-3 items-center group/f cursor-pointer">
        <div className="">
          <i className="text-2xl fa-brands group-hover/f:text-fresh duration-300 fa-facebook-f"></i>
        </div>
        <p className="font-medium group-hover/f:text-fresh duration-300 max-sm text-center">
          Share on facebook
        </p>
      </div>

      <div className="flex max-sm:flex-col max-sm justify-center gap-3 items-center group/f cursor-pointer">
        <div className="">
          <i className="text-2xl fa-brands group-hover/f:text-fresh duration-300 fa-twitter"></i>
        </div>
        <p className="font-medium group-hover/f:text-fresh duration-300 max-sm text-center">
          Share on twitter
        </p>
      </div>

      <div className="flex max-sm:flex-col max-sm justify-center gap-3 items-center group/f cursor-pointer">
        <div className="">
          <i className="text-2xl fa-brands group-hover/f:text-fresh duration-300 fa-pinterest-p"></i>
        </div>
        <p className="font-medium group-hover/f:text-fresh duration-300 max-sm text-center">
          Share on pinterest
        </p>
      </div>
    </div>
  );
}
