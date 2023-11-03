import * as React from "react";
import { useEffect, useState } from "react";
import productApi from "../../api/modules/productApi";
import { AxiosResponse } from "axios";
import { IProduct } from "../../interfaces/productInterface";
import { useNavigate } from "react-router-dom";

export interface ISearchProps {
  isShowSearch: boolean;
  setIsShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Search(props: ISearchProps) {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>();
  const navigate = useNavigate();
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      let searchProducts: NodeJS.Timeout = setTimeout(() => {
        productApi
          .searchProduct(query)
          .then((res: AxiosResponse) => setProducts(res.data.products))
          .catch((e) => {
            console.log(e);
          })
          .finally(() => setIsLoading(false));
      }, 500);

      return () => clearTimeout(searchProducts);
    }
  }, [query]);
  return (
    <div
      className={`flex items-center ${
        props.isShowSearch ? "gap-2" : "gap-0"
      } relative`}
    >
      {!isLoading && (
        <div className="text-xs absolute top-[85px] bg-white z-10 right-0 flex flex-col gap-2 px-3  w-64 overflow-y-scroll max-h-60 ">
          {products?.map((product: IProduct) => (
            <div
              key={Math.random()}
              onClick={() => {
                navigate(`/products/${product._id}`);
                setQuery("");
                setProducts([]);
                window.scrollTo(0, 0);
              }}
              className="cursor-pointer flex items-center my-1 gap-4 group"
            >
              <div className="basis-1/2">
                <img src={product.photo[0]} className="w-full" alt="" />
              </div>
              <div className="basis-1/2 group-hover:text-light">
                <p>{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        className={`rounded-full ${
          props.isShowSearch ? "w-32 px-3 border " : "w-0"
        } text-xs border-gray py-2 duration-500`}
        placeholder="Search..."
      />
      {props.isShowSearch ? (
        <span
          onClick={() => {
            props.setIsShowSearch(false);
            setQuery("");
            setProducts([]);
          }}
          className=" duration-200 hover:text-fresh cursor-pointer leading-[85px]"
        >
          <i className="fa-regular fa-xmark fa-rotate-90"></i>
        </span>
      ) : (
        <span
          onClick={() => props.setIsShowSearch(true)}
          className=" duration-200 hover:text-fresh cursor-pointer leading-[85px]"
        >
          <i className="fa-regular fa-magnifying-glass fa-rotate-90"></i>
        </span>
      )}
    </div>
  );
}
