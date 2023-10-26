import { IReview } from "./reviewInterface";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  size: string[];
  color: string[];
  photo: string[];
  category: string[];
  tag: string[];
  inventory: number;
  averageRating: number;
  numOfReviews: number;
  description: string;
  brand: string;
  reviews: IReview[];
}

export interface ICart {
  product: IProduct;
  quantity: number;
}
