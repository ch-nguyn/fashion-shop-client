import * as React from "react";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <footer className="bg-dark py-20 text-white">
      <div className="max-w-[1200px] mx-auto flex gap-10 max-lg:flex-col max-lg:px-5">
        <div className="basis-1/4">
          <h3 className="">Contact us</h3>
          <p>
            <span>add:</span>University of Transport and Technology, Trieu Khuc,
            Thanh Xuan, Hanoi
          </p>
          <p>
            <span>tell:</span>
            <a href="tel:0816516215">0816.516.215</a>
          </p>
          <p>
            <span>email:</span>
            <a href="mailto:chien2010nh@gmail.com">chien2010nh@gmail.com</a>
          </p>
        </div>
        <div className="basis-1/4">
          <h3 className="">categories</h3>
          <p className="capitalize">Fashion</p>
          <p className="capitalize">Accessories</p>
          <p className="capitalize">men</p>
          <p className="capitalize">sportswear</p>
          <p className="capitalize">shoes</p>
          <p className="capitalize">watch</p>
        </div>
        <div className="basis-1/4">
          <h3 className="">service</h3>
          <p className="capitalize">sale</p>
          <p className="capitalize">Quick ship</p>
          <p className="capitalize">New Designs</p>
          <p className="capitalize">Accidental Fabric Protection</p>
          <p className="capitalize">Fashion Care</p>
          <p className="capitalize">Gift Cards</p>
        </div>
        <div className="basis-1/4">
          <h3>join us</h3>
          <p>
            Enter your email below to be the first to know about new collections
            and product launches.
          </p>
          <div className="flex items-center mt-3">
            <input
              type="text"
              className="basis-3/4 mr-3 outline-none text-black px-3 py-2"
            />
            <div className="basis-1/4 bg-fresh flex justify-center items-center h-10 px-4 hover:bg-white hover:text-black duration-300 cursor-pointer">
              <i className="fa-light fa-envelope text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
