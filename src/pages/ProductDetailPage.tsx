import * as React from "react";
import Header from "../components/productDetail/Header";
import { IProduct } from "../interfaces/productInterface";
import { useState, useEffect } from "react";
import productApi from "../api/modules/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import Detail from "../components/productDetail/Detail";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getProductsStart } from "../features/slice/productSlice";
import Share from "../components/productDetail/Share";
import Information from "../components/productDetail/Information";
import { getUserStart } from "../features/slice/userSlice";
import Swal from "sweetalert2";
import ProductDetailSke from "../components/skeleton/ProductDetailSke";

export interface IProductDetailProps {}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>({
    _id: "",
    name: "",
    price: 0,
    discountPrice: 0,
    size: [],
    color: [],
    photo: [],
    category: [],
    tag: [],
    inventory: 0,
    averageRating: 0,
    numOfReviews: 0,
    description: "",
    brand: "",
    reviews: [],
  });
  const navigate = useNavigate();
  const [isReview, setIsReview] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res: AxiosResponse = await productApi.getSingleProduct(id);
        setIsLoading(false);
        setProduct(res.data.product);
      } catch (e) {
        Swal.fire("Oops...!", "There's no product with that ID", "error").then(
          () => {
            navigate("/products");
            window.scrollTo(0, 0);
          }
        );
      }
    })();
  }, [isReview]);

  useEffect(() => {
    dispatch(getUserStart());
  }, []);

  return (
    <div className="mt-[85px] max-md:mt-0">
      <Header product={product} />
      {isLoading ? (
        <ProductDetailSke />
      ) : (
        <>
          <Detail product={product} />
          <Share />
          <Information
            isReview={isReview}
            setIsReview={setIsReview}
            user={user}
            product={product}
          />
        </>
      )}
    </div>
  );
}
