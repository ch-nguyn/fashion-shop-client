import * as React from "react";
import CloseButton from "../common/CloseButton";
import { IFilter, IFilterCheckbox } from "../../interfaces/filterInterface";
import { IProduct } from "../../interfaces/productInterface";
import Sidebar from "./Sidebar";

export interface IFilterMobileProps {
  isShowFilter: boolean;
  setIsShowFilter: any;
  products: IProduct[];
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterBrands: IFilterCheckbox[];
  setFilterBrands: React.Dispatch<React.SetStateAction<IFilterCheckbox[]>>;
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
  minDistance: number;
  filterStatus: IFilterCheckbox[];
  setFilterStatus: React.Dispatch<React.SetStateAction<IFilterCheckbox[]>>;
}

export default function FilterMobile(props: IFilterMobileProps) {
  return (
    <div
      id="sidebar"
      className={`fixed z-50 top-0 left-0 w-full h-[100vh] overflow-y-scroll duration-500 ${
        props.isShowFilter ? "translate-x-0" : "translate-x-[-100%]"
      } bg-white`}
    >
      <div
        onClick={() => props.setIsShowFilter(false)}
        className="group/x absolute top-5 right-5 border border-light rounded-full"
      >
        <CloseButton />
      </div>
      <div className="mt-20 px-8">
        <Sidebar
          setFilterStatus={props.setFilterStatus}
          filterStatus={props.filterStatus}
          price={props.price}
          setPrice={props.setPrice}
          products={props.products}
          filter={props.filter}
          setFilter={props.setFilter}
          filterBrands={props.filterBrands}
          setFilterBrands={props.setFilterBrands}
          minDistance={props.minDistance}
        />
      </div>
    </div>
  );
}
