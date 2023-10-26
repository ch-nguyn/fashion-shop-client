import * as React from "react";
import ProductHeader from "../components/products/ProductHeader";
import ProductsCatalog from "../components/products/ProductCatalog";
import { useNavigate } from "react-router-dom";

export interface IProductCategoryProps {}

export default function ProductCategory(props: IProductCategoryProps) {
  const navigate = useNavigate();
  return (
    <div id="catalog" className="mt-[85px] max-sm:mt-0">
      <ProductHeader navigate={navigate} />
      <ProductsCatalog />
    </div>
  );
}
