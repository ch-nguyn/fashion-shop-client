import * as React from "react";
import { useNavigate } from "react-router-dom";

export interface INotFoundProps {}

export default function NotFound(props: INotFoundProps) {
  const navigate = useNavigate();
  return (
    <div className="md:mt-[85px] ">
      <div className="w-full max-sm:h-[40vh] h-[50vh] bg-fresh flex items-center justify-center">
        <p className="text-white  max-lg:text-5xl text-7xl text-center font-bold">
          404 - Page not found
        </p>
      </div>
      <div className="max-w-[1200px] px-5 mx-auto py-24">
        <h3 className="font-bold text-3xl mb-5">
          Page you are looking is not found
        </h3>
        <p className="text-gray mb-8">
          The page you are looking for does not exist. It may have been moved,
          or removed altogether. Perhaps you can return back to the site's
          homepage and see if you can find what you are looking for.
        </p>
        <button
          onClick={() => {
            navigate("/home");
            window.scrollTo(0, 0);
          }}
          className="uppercase text-white bg-fresh py-4 px-10 hover:bg-black duration-300"
        >
          go back to home page
        </button>
      </div>
    </div>
  );
}
