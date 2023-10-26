import * as React from "react";

export default function CloseButton(props: any) {
  return (
    <div className=" w-8 h-8 flex justify-center items-center  ">
      <div className="relative  w-8 h-8 cursor-pointer">
        <i className="text-[8px] fa-solid fa-slash  group-hover/x:rotate-[142deg] duration-[0.4s] rotate-[100deg] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></i>
        <i className="text-[8px] fa-solid fa-slash  group-hover/x:rotate-[142deg] duration-[0.4s] rotate-[187deg] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></i>
      </div>
    </div>
  );
}
