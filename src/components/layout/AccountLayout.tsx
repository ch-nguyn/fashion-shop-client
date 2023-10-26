import * as React from "react";
import { Outlet } from "react-router-dom";

export interface IAccountLayoutProps {}

export default function AccountLayout(props: IAccountLayoutProps) {
  return (
    <div className="mt-[85px] max-md:mt-0">
      <div className="flex mb-24 max-sm:mb-10 bg-cover max-sm:h-[40vh] bg-no-repeat bg-center justify-center items-center bg-[url('https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/my-account-title-image.jpg')] w-full h-[50vh] bg-fixed">
        <p className="text-white  max-lg:text-5xl text-7xl text-center">
          My account
        </p>
      </div>
      <Outlet />
    </div>
  );
}
