import * as React from "react";
import { useState } from "react";
import { IProduct } from "../../interfaces/productInterface";
import { IFilter, IFilterCheckbox } from "../../interfaces/filterInterface";
import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface ISidebarProps {
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

export default function Sidebar(props: ISidebarProps) {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState({
    category: true,
    filterPrice: true,
    filterStatus: true,
    brand: true,
    featuredItem: true,
  });

  const [categories, setCategories] = useState<string[]>([
    "women",
    "men",
    "essentials",
    "accessories",
    "headphones & earphones",
    "new collection",
    "premium collection",
    "shoes",
    "sportswear",
    "uncategorized",
  ]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      props.setPrice([
        Math.min(newValue[0], props.price[1] - props.minDistance),
        props.price[1],
      ]);
    } else {
      props.setPrice([
        props.price[0],
        Math.max(newValue[1], props.price[0] + props.minDistance),
      ]);
    }
    props.setPrice(newValue);
  };

  return (
    <div>
      <div className="mb-6">
        <div
          onClick={() => {
            setIsShow({ ...isShow, category: !isShow.category });
          }}
          className="flex justify-between items-center cursor-pointer mb-3 hover:text-fresh"
        >
          <h3 className="text-xl font-semibold  duration-500">
            Product Categories
          </h3>
          <i
            className={`fa-regular fa-angle-down duration-500 ${
              !isShow.category && "rotate-180"
            } text-xl`}
          ></i>
        </div>
        <div
          id="sidebar"
          className={`flex flex-col duration-500 bg-white overflow-y-scroll ${
            isShow.category ? " h-[375px]" : "h-0"
          }`}
        >
          {categories.map((category: string) => (
            <div
              onClick={() =>
                props.setFilter({ ...props.filter, category: category })
              }
              className="py-[7.5px] flex justify-between items-center text-[15px] cursor-pointer group/category"
              key={category}
            >
              <div className="relative">
                <p
                  className={`capitalize group-hover/category:text-fresh duration-300 ${
                    props.filter.category === category && "text-fresh"
                  }`}
                >
                  {category}
                </p>
                <span
                  className={`absolute group-hover/category:w-full bottom-0 left-0 bg-fresh duration-500 h-[1px] ${
                    props.filter.category === category ? "w-full" : "w-0"
                  }`}
                ></span>
              </div>
              <span
                className={` text-sm group-hover/category:text-fresh  duration-300 ${
                  props.filter.category === category
                    ? " text-fresh "
                    : "text-gray"
                }`}
              >{`(${
                props.products?.filter((product: IProduct) =>
                  product.category.includes(category)
                ).length
              })`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div
          onClick={() => {
            setIsShow({ ...isShow, filterStatus: !isShow.filterStatus });
          }}
          className="flex justify-between items-center cursor-pointer mb-3 hover:text-fresh"
        >
          <h3 className="text-xl font-semibold  duration-500">
            Product Status
          </h3>
          <i
            className={`fa-regular fa-angle-down duration-500 ${
              !isShow.filterStatus && "rotate-180"
            } text-xl`}
          ></i>
        </div>
        <div
          className={`${
            isShow.filterStatus ? "h-[126px]" : "h-0"
          } duration-500 overflow-hidden`}
        >
          <RadioGroup>
            {props.filterStatus?.map((filterstatus: IFilterCheckbox) => (
              <div
                key={Math.random()}
                className="flex justify-between items-center"
              >
                <FormControlLabel
                  className="capitalize cursor-pointer w-full hover:text-fresh"
                  value="end"
                  control={<Radio color="default" />}
                  label={filterstatus.label}
                  labelPlacement="end"
                  checked={filterstatus.checked}
                  onClick={() => {
                    let newFilterStatus = [...props.filterStatus];
                    newFilterStatus = newFilterStatus.map(
                      (status: IFilterCheckbox) =>
                        status.id === filterstatus.id
                          ? { ...status, checked: !status.checked }
                          : { ...status, checked: false }
                    );
                    props.setFilterStatus(newFilterStatus);
                  }}
                />
                <span
                  className={` text-sm group-hover/category:text-fresh  duration-300`}
                >{`(${
                  props.products?.filter((product: IProduct) => {
                    if (filterstatus.label === "on sale") {
                      return product.discountPrice;
                    } else if (filterstatus.label === "in stock") {
                      return product.inventory !== 0;
                    } else if (filterstatus.label === "out of stock") {
                      return product.inventory === 0;
                    }
                  }).length
                })`}</span>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="mb-6">
        <div
          onClick={() => {
            setIsShow({ ...isShow, filterPrice: !isShow.filterPrice });
          }}
          className="flex justify-between items-center cursor-pointer mb-3 hover:text-fresh"
        >
          <h3 className="text-xl font-semibold  duration-500">Price</h3>
          <i
            className={`fa-regular fa-angle-down duration-500 ${
              !isShow.filterPrice && "rotate-180"
            } text-xl`}
          ></i>
        </div>
        <div
          className={`${
            isShow.filterPrice ? "h-[80px]" : "h-0"
          } overflow-hidden duration-500 flex justify-center flex-col items-center`}
        >
          <div className="flex justify-center w-[95%]">
            <Slider
              getAriaLabel={() => "Minimum distance"}
              style={{ color: "#0cc3ce" }}
              value={props.price}
              max={1000}
              onChange={handleChange}
              valueLabelDisplay="off"
              disableSwap
              size="small"
            />
          </div>
          <div className="self-start mt-3">
            <span className="mr-5">Price:</span>
            <span className="mr-2">${props.price[0]}</span>
            <i className="mr-2 fa-light fa-dash"></i>
            <span>${props.price[1]}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div
          onClick={() => {
            setIsShow({ ...isShow, brand: !isShow.brand });
          }}
          className="flex justify-between items-center cursor-pointer mb-3 hover:text-fresh"
        >
          <h3 className="text-xl font-semibold  duration-500">Brands</h3>
          <i
            className={`fa-regular fa-angle-down duration-500 ${
              !isShow.brand && "rotate-180"
            } text-xl`}
          ></i>
        </div>
        <div
          className={`${
            isShow.brand ? "h-[168px]" : "h-0"
          } duration-500 overflow-hidden`}
        >
          {props.filterBrands?.map((filterBrand: IFilterCheckbox) => (
            <div
              key={Math.random()}
              className="flex justify-between items-center"
            >
              <FormControlLabel
                className="capitalize cursor-pointer w-full hover:text-fresh"
                value="end"
                control={<Checkbox color="default" />}
                label={filterBrand.label}
                labelPlacement="end"
                checked={filterBrand.checked}
                onChange={() => {
                  let newFilterBrands = [...props.filterBrands];
                  newFilterBrands = newFilterBrands.map(
                    (brand: IFilterCheckbox) =>
                      brand.id === filterBrand.id
                        ? { ...brand, checked: !brand.checked }
                        : brand
                  );
                  props.setFilterBrands(newFilterBrands);
                }}
              />
              <span
                className={` text-sm group-hover/category:text-fresh  duration-300`}
              >{`(${
                props.products?.filter((product: IProduct) =>
                  product.brand.includes(filterBrand.label)
                ).length
              })`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div
          onClick={() => {
            setIsShow({ ...isShow, featuredItem: !isShow.featuredItem });
          }}
          className="flex justify-between items-center cursor-pointer mb-3 hover:text-fresh"
        >
          <h3 className="text-xl font-semibold  duration-500">
            Featured Items
          </h3>
          <i
            className={`fa-regular fa-angle-down duration-500 ${
              !isShow.featuredItem && "rotate-180"
            } text-xl`}
          ></i>
        </div>
        <div
          id="sidebar"
          className={`pt-2 ${
            isShow.featuredItem ? "h-[259px]" : "h-0"
          } duration-500 overflow-scroll`}
        >
          {props.products.slice(0, 4).map((product: IProduct) => (
            <div
              key={product._id}
              onClick={() => {
                navigate(`/products/${product._id}`);
                window.scrollTo(0, 0);
              }}
              className="flex  cursor-pointer hover:opacity-60 mb-4"
            >
              <div className="basis-[30%] mr-4">
                <img className="w-full" src={product.photo[0]} alt="" />
              </div>
              <div className="basis-[70%] font-medium">
                <p>{product.name}</p>
                <p className="capitalize text-xs text-gray mt-1">
                  {product.category.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
