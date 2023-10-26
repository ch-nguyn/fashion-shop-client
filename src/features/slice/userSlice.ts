import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/userInterface";

export interface IProductSlice {
  user: IUser;
  isLoading: boolean;
  error: boolean;
}

const initialState: IProductSlice = {
  user: {
    photo: "",
    role: "",
    isVerify: true,
    _id: "",
    name: "",
    email: "",
    phoneNumber: "",
  },
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    getUserStart: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    getUserFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { getUserStart, getUserFailure, getUserSuccess } =
  userSlice.actions;
export default userSlice.reducer;
