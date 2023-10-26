/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useState } from "react";
import {
  finishLoadingDebounce,
  getProductsStart,
  loadingDebounce,
} from "../../features/slice/productSlice";
import { IProduct } from "../../interfaces/productInterface";
import { IFilter, IFilterCheckbox } from "../../interfaces/filterInterface";
import FilterMobile from "./FilterMobile";

export interface IProductsCatalogProps {}

export default function ProductsCatalog(props: IProductsCatalogProps) {
  let { products, isLoading } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    category: "all",
  });
  const [minDistance, setMinDistance] = useState<number>(100);
  const [price, setPrice] = useState<number[]>([0, 1000]);
  const [priceChange, setPriceChange] = useState<boolean>(false);
  const [layout, setLayout] = useState<"grid" | "row">("grid");
  const [grid, setGrid] = useState<2 | 3 | 4>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [sort, setSort] = useState<string>("newest");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filterBrands, setFilterBrands] = useState<IFilterCheckbox[]>([
    {
      id: 0,
      checked: false,
      label: "dior",
    },
    {
      id: 1,
      checked: false,
      label: "nike",
    },
    {
      id: 2,
      checked: false,
      label: "puma",
    },
    {
      id: 3,
      checked: false,
      label: "vans",
    },
  ]);
  const [filterStatus, setFilterStatus] = useState<IFilterCheckbox[]>([
    {
      id: 0,
      checked: false,
      label: "on sale",
    },
    {
      id: 1,
      checked: false,
      label: "in stock",
    },
    {
      id: 2,
      checked: false,
      label: "out of stock",
    },
  ]);

  useEffect(() => {
    dispatch(getProductsStart());
  }, []);

  const [loadingDebounce, setLoadingDebounce] = useState<boolean>(false);

  useEffect(() => {
    setLoadingDebounce(true);
    let getPrice = setTimeout(() => {
      setPriceChange(!priceChange);
      setLoadingDebounce(false);
    }, 500);

    return () => clearTimeout(getPrice);
  }, [price, filterBrands, filterStatus, filter.category]);

  useEffect(() => {
    let newProducts: IProduct[] = [...products];

    if (sort === "highest rating") {
      newProducts = newProducts.sort(function (a: IProduct, b: IProduct) {
        if (a.averageRating < b.averageRating) {
          return 1;
        }
        if (a.averageRating > b.averageRating) {
          return -1;
        }
        return 0;
      });
    }

    if (sort === "a to z") {
      newProducts = newProducts.sort(function (a: IProduct, b: IProduct) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }

    if (sort === "z to a") {
      newProducts = newProducts.sort(function (a: IProduct, b: IProduct) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    }

    if (sort === "price: high to low") {
      newProducts = newProducts.sort(function (a: IProduct, b: IProduct) {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    }

    if (sort === "price: low to high") {
      newProducts = newProducts.sort(function (a: IProduct, b: IProduct) {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
    }

    if (filter.category !== "all") {
      newProducts = newProducts.filter((product: IProduct) =>
        product.category.includes(filter.category)
      );
    }

    let checkedBrands: string[] = [];
    filterBrands
      .filter((brand: IFilterCheckbox) => brand.checked)
      .map((brand: IFilterCheckbox) => checkedBrands.push(brand.label));
    if (checkedBrands.length) {
      newProducts = newProducts.filter((product: IProduct) =>
        checkedBrands.includes(product.brand)
      );
    }

    let newFilterStatus = filterStatus.filter(
      (status: IFilterCheckbox) => status.checked
    );
    if (newFilterStatus.length) {
      if (newFilterStatus[0].label === "on sale") {
        newProducts = newProducts.filter(
          (product: IProduct) => product.discountPrice
        );
      } else if (newFilterStatus[0].label === "in stock") {
        newProducts = newProducts.filter(
          (product: IProduct) => product.inventory !== 0
        );
      } else if (newFilterStatus[0].label === "out of stock") {
        newProducts = newProducts.filter(
          (product: IProduct) => product.inventory === 0
        );
      }
    }

    newProducts = newProducts.filter((product: IProduct) =>
      product.discountPrice
        ? product.discountPrice >= price[0] && product.discountPrice <= price[1]
        : product.price >= price[0] && product.price <= price[1]
    );

    setTotalPages(Math.ceil(newProducts.length / itemsPerPage));
    const start: number = itemsPerPage * (currentPage - 1);
    const end: number = itemsPerPage * currentPage;
    newProducts = newProducts.slice(start, end);

    setFilteredProducts(newProducts);
  }, [
    filter,
    products,
    filterBrands,
    priceChange,
    filterStatus,
    currentPage,
    sort,
  ]);
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);

  return (
    <div
      id="catalog"
      className="flex pb-28 gap-8 lg:px-28 mx-auto md:px-10 sm:px-5 max-lg:gap-0"
    >
      <FilterMobile
        isShowFilter={isShowFilter}
        setIsShowFilter={setIsShowFilter}
        setFilterStatus={setFilterStatus}
        filterStatus={filterStatus}
        price={price}
        setPrice={setPrice}
        products={products}
        filter={filter}
        setFilter={setFilter}
        filterBrands={filterBrands}
        setFilterBrands={setFilterBrands}
        minDistance={minDistance}
      />

      <div className="basis-[20%] max-lg:hidden">
        <Sidebar
          setFilterStatus={setFilterStatus}
          filterStatus={filterStatus}
          price={price}
          setPrice={setPrice}
          products={products}
          filter={filter}
          setFilter={setFilter}
          filterBrands={filterBrands}
          setFilterBrands={setFilterBrands}
          minDistance={minDistance}
        />
      </div>
      <div className="basis-[80%] max-lg:basis-full">
        <ProductList
          loadingDebounce={loadingDebounce}
          setIsShowFilter={setIsShowFilter}
          filterBrands={filterBrands}
          filterStatus={filterStatus}
          setFilterBrands={setFilterBrands}
          setFilterStatus={setFilterStatus}
          setPrice={setPrice}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setSort={setSort}
          sort={sort}
          setLayout={setLayout}
          filter={filter}
          setFilter={setFilter}
          isLoading={isLoading}
          filteredProducts={filteredProducts}
          products={products}
          grid={grid}
          layout={layout}
          currentPage={currentPage}
          totalPages={totalPages}
          price={price}
        />
      </div>
    </div>
  );
}
