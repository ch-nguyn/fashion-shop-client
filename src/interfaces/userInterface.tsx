export interface IAddress {
  country?: string;
  province?: string;
  district?: string;
  ward?: string;
  detailAddress?: string;
  zipcode?: string;
  _id?: string;
}

export interface IUser {
  photo: string;
  role: string;
  isVerify: boolean;
  _id: string;
  name: string;
  fullName?: string;
  email: string;
  phoneNumber: string;
  address?: IAddress[];
}

export interface UpdateUser {
  name?: string;
  phoneNumber?: string;
  fullName?: string;
  address?: IAddress;
  photo?: string;
}
