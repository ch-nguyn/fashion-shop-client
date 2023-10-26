import { CreateReview, UpdateReview } from "../../interfaces/reviewInterface";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const reviewApi = {
  getAllReviews: () => publicClient.get("/reviews"),
  getSingleReview: (id: string) => publicClient.get(`/reviews/${id}`),
  createReview: (params: CreateReview) =>
    privateClient.post("/reviews", params),
  deleteReview: (id: string) => privateClient.delete(`/reviews/${id}`),
  updateReview: (id: string, params: UpdateReview) =>
    privateClient.patch(`/reviews/${id}`, params),
};

export default reviewApi;
