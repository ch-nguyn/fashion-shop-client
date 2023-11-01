import * as React from "react";

export interface IOrdersSkeProps {}

export default function OrdersSke(props: IOrdersSkeProps) {
  return (
    <div className="animate-pulse flex w-full flex-col">
      <div className="w-full bg-light mb-8 h-[72px] "></div>
      <div className="w-full bg-light mb-8 h-[72px] "></div>
      <div className="w-full bg-light mb-8 h-[72px] "></div>
      <div className="w-full bg-light mb-8 h-[72px] "></div>
    </div>
  );
}
