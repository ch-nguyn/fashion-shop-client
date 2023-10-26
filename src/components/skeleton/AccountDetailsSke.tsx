import * as React from "react";

export interface IAccountDetailsSkeProps {}

export default function AccountDetailsSke(props: IAccountDetailsSkeProps) {
  return (
    <div className="animate-pulse flex w-full flex-col">
      <div className="w-full bg-light mb-6 h-[24px] "></div>
      <div className="w-full bg-light mb-6 h-[24px] "></div>
      <div className="w-full bg-light mb-6 h-[24px] "></div>
      <div className="w-full bg-light mb-6 h-[24px] "></div>

      <div className="w-1/5 self-end bg-light mb-6 h-[24px] "></div>
    </div>
  );
}
