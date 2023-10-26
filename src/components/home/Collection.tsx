import * as React from "react";
import { useNavigate } from "react-router-dom";

interface ICollectionItem {
  imgNum: number;
  collection: string;
}

export default function Collection() {
  return (
    <div className="p-10 flex gap-7 max-sm:gap-2 max-sm:p-3 bg-[#f6f6f6] ">
      <CollectionItem imgNum={1} collection={"Sportware"} />
      <CollectionItem imgNum={2} collection={"Women"} />
      <CollectionItem imgNum={3} collection={"Men"} />
      <CollectionItem imgNum={4} collection={"Shoes"} />
      <CollectionItem imgNum={5} collection={"Accessories"} />
    </div>
  );
}

const CollectionItem = (props: ICollectionItem) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/products");
        window.scrollTo(0, 0);
      }}
      className="basis-1/5 relative overflow-hidden group/collection cursor-pointer"
    >
      <img
        className="w-full "
        src={`https://suprema.qodeinteractive.com/wp-content/uploads/2016/02/home-shop-1-image-${props.imgNum}.jpg`}
        alt=""
      />
      <div className=" bg-black opacity-0 duration-300  group-hover/collection:opacity-60 absolute w-full h-full top-0 left-0"></div>
      <span className="text-lg max-sm:text-xs font-semibold duration-300 opacity-0 group-hover/collection:opacity-100 text-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        {props.collection}
      </span>
    </div>
  );
};
