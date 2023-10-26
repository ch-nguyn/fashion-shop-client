interface IReviewUser {
  photo: string;
  _id: string;
  name: string;
}

export interface IReview {
  createAt: string;
  _id: string;
  title: string;
  comment: string;
  rating: number;
  product: string;
  user: IReviewUser;
}

export interface CreateReview {
  rating: number | null;
  title: string;
  comment: string;
  product: string;
}

export interface UpdateReview {
  rating: number | null;
  title: string;
  comment: string;
}
