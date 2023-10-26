import * as React from "react";

export interface IAboutFeaturedItem {
  icon: string;
  title: string;
}

export const AboutFeaturedItem = (props: IAboutFeaturedItem) => {
  return (
    <div className="basis-1/4 flex flex-col items-center">
      <i
        className={`fa-light fa-${props.icon} text-7xl mb-9 text-[#aaaaaa]`}
      ></i>
      <h4 className="font-semibold mb-3">{props.title}</h4>
      <p className="leading-6 text-sm opacity-60 text-center">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
      </p>
    </div>
  );
};
