import * as React from "react";
import { IProduct } from "../../interfaces/productInterface";
import ProductItem from "../common/ProductItem";
import ProductListSke from "../skeleton/ProductListSke";
import { IFilter, IFilterCheckbox } from "../../interfaces/filterInterface";
import { useEffect, useState } from "react";
import ProductItemRow from "./ProductItemRow";
import CloseButton from "../common/CloseButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCartProduct } from "../../features/slice/productSlice";
import { toast } from "react-toastify";

export interface IProductListProps {
  products: IProduct[];
  filteredProducts: IProduct[];
  isLoading: boolean;
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  grid: 2 | 3 | 4;
  layout: "grid" | "row";
  setLayout: React.Dispatch<React.SetStateAction<"grid" | "row">>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
  filterStatus: IFilterCheckbox[];
  setFilterStatus: React.Dispatch<React.SetStateAction<IFilterCheckbox[]>>;
  filterBrands: IFilterCheckbox[];
  setFilterBrands: React.Dispatch<React.SetStateAction<IFilterCheckbox[]>>;
  setIsShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  loadingDebounce: boolean;
}

export default function ProductList(props: IProductListProps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortList, setSortList] = useState<string[]>([
    "newest",
    "highest rating",
    "a to z",
    "z to a",
    "price: low to high",
    "price: high to low",
  ]);
  const [pagesArr, setPagesArr] = useState<number[]>([]);
  const { cartItems } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { isLoading, products } = useAppSelector((state) => state.product);

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      dispatch(getCartProduct(JSON.parse(cartItems)));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    for (let i = 1; i <= props.totalPages; i++) {
      if (pagesArr.length > props.totalPages) {
        setPagesArr((current) => current.slice(0, props.currentPage));
      } else {
        if (!pagesArr.includes(i)) {
          setPagesArr((current) => [...current, i]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.totalPages]);

  return (
    <div>
      <button
        onClick={() => props.setIsShowFilter(true)}
        className="mb-5 mx-3 border px-4 py-2 lg:hidden"
      >
        <i className="fa-light fa-filter mr-2"></i>
        Filter
      </button>
      <div className={`flex  justify-between items-center mb-5 mx-3 `}>
        <div className="flex items-center justify-between w-full">
          <div className="flex mr-8 max-lg:mr-0">
            <span className="mr-5 cursor-default max-sm:mr-4">Sort by:</span>
            <div
              onClick={() => {
                setIsShow(!isShow);
              }}
              className="capitalize cursor-pointer px-4 relative max-lg:px-0"
            >
              {props.sort}
              <i
                className={`fa-light fa-angle-down duration-500 ml-3 ${
                  !isShow && "rotate-180"
                }`}
              ></i>
              <div
                className={`z-40  absolute top-[30px] left-0  w-[200px] ${
                  isShow ? "h-[240px]" : "h-0"
                } overflow-hidden duration-500 shadow-lg`}
              >
                {sortList.map((item: string) => (
                  <div
                    key={Math.random()}
                    onClick={() => props.setSort(item)}
                    className="hover:bg-fresh duration-100 hover:text-white bg-white  px-4 py-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xl flex items-center text-light max-xl:hidden">
            <i
              onClick={() => props.setLayout("row")}
              className={`fa-regular fa-list-ul hover:text-fresh cursor-pointer mr-5 ${
                props.layout === "row" && "text-fresh"
              }`}
            ></i>
            <i
              onClick={() => props.setLayout("grid")}
              className={`fa-regular fa-grid-2 hover:text-fresh cursor-pointer  ${
                props.layout === "grid" && "text-fresh"
              }`}
            ></i>
          </div>
        </div>
      </div>

      <div className="mx-3 mb-5 flex gap-2 max-sm:flex-wrap">
        {props.filter.category !== "all" ? (
          <span
            onClick={() => {
              props.setFilter({ category: "all" });
            }}
            className="capitalize inline-flex pl-2 items-center group/x cursor-pointer border-[1px]"
          >
            <p className="text-sm">{props.filter.category}</p>
            <CloseButton></CloseButton>
          </span>
        ) : (
          ""
        )}

        {props.price[0] !== 0 || props.price[1] !== 1000 ? (
          <span
            onClick={() => {
              props.setPrice([0, 1000]);
            }}
            className="capitalize inline-flex pl-2 items-center group/x cursor-pointer border-[1px]"
          >
            <p className="text-sm">
              ${props.price[0]} - ${props.price[1]}
            </p>
            <CloseButton></CloseButton>
          </span>
        ) : (
          ""
        )}

        {props.filterStatus
          .filter((filterStatus: IFilterCheckbox) => filterStatus.checked)
          .map((filterStatus: IFilterCheckbox) => (
            <span
              key={Math.random()}
              onClick={() => {
                let newFilterStatus = [...props.filterStatus];
                newFilterStatus = newFilterStatus.map(
                  (status: IFilterCheckbox) =>
                    status.id === filterStatus.id
                      ? { ...status, checked: !status.checked }
                      : { ...status, checked: false }
                );
                props.setFilterStatus(newFilterStatus);
              }}
              className="capitalize inline-flex pl-2 items-center group/x cursor-pointer border-[1px]"
            >
              <p className="text-sm">{filterStatus.label}</p>
              <CloseButton></CloseButton>
            </span>
          ))}

        {props.filterBrands
          .filter((filterBrands: IFilterCheckbox) => filterBrands.checked)
          .map((filterBrands: IFilterCheckbox) => (
            <span
              key={Math.random()}
              onClick={() => {
                let newFilterBrands = [...props.filterBrands];
                newFilterBrands = newFilterBrands.map(
                  (brand: IFilterCheckbox) =>
                    brand.id === filterBrands.id
                      ? { ...brand, checked: !brand.checked }
                      : { ...brand, checked: brand.checked }
                );
                props.setFilterBrands(newFilterBrands);
              }}
              className="capitalize inline-flex pl-2 items-center group/x cursor-pointer border-[1px]"
            >
              <p className="text-sm">{filterBrands.label}</p>
              <CloseButton></CloseButton>
            </span>
          ))}
      </div>

      <div className="flex flex-wrap max-sm:px-2">
        {isLoading || props.loadingDebounce ? (
          <ProductListSke />
        ) : props.filteredProducts.length > 0 ? (
          props.filteredProducts.map((product: IProduct) =>
            props.layout === "grid" ? (
              <div
                key={Math.random()}
                className={`overflow-hidden basis-1/3 max-md:basis-1/2`}
              >
                <ProductItem
                  product={product}
                  filter={props.filter}
                  setFilter={props.setFilter}
                  dispatch={dispatch}
                ></ProductItem>
              </div>
            ) : (
              <ProductItemRow
                dispatch={dispatch}
                product={product}
                key={Math.random()}
              />
            )
          )
        ) : (
          <div>There's no product match your filter</div>
        )}
      </div>
      {products.length > 12 && (
        <div className="flex gap-1 justify-center">
          {props.currentPage > 1 && (
            <div
              onClick={() => props.setCurrentPage((current) => current - 1)}
              className="flex items-center px-6  hover:text-fresh cursor-pointer duration-300"
            >
              <i className="fa-light fa-arrow-left-long "></i>
            </div>
          )}
          {pagesArr.map((pageNum: number) => (
            <div
              key={Math.random()}
              onClick={() =>
                props.setCurrentPage((current) => (current = pageNum))
              }
              className={`hover:bg-fresh hover:border-fresh hover:text-white duration-300 cursor-pointer border-[1px] border-black ${
                props.currentPage === pageNum && "bg-black text-white"
              }  py-2 px-6`}
            >
              {pageNum}
            </div>
          ))}
          {props.currentPage < props.totalPages && (
            <div
              onClick={() => props.setCurrentPage((current) => current + 1)}
              className="flex items-center px-6  hover:text-fresh cursor-pointer duration-300"
            >
              <i className="fa-light fa-arrow-right-long "></i>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
