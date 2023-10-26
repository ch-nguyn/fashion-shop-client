import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICart, IProduct } from "../../interfaces/productInterface";

export interface IProductSlice {
  products: IProduct[];
  cartItems: ICart[];
  isLoading: boolean;
  error: boolean;
}

const initialState: IProductSlice = {
  products: [],
  cartItems: [],
  isLoading: false,
  error: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsStart: (state) => {
      state.isLoading = true;
    },
    getProductsSuccess: (state, action: PayloadAction<IProduct[]>) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    getProductsFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },

    loadingDebounce: (state) => {
      state.isLoading = true;
    },
    finishLoadingDebounce: (state) => {
      state.isLoading = false;
    },
    getCartProduct: (state, actions) => {
      state.cartItems = actions.payload;
    },
    addToCart: (state, actions) => {
      // find index of product
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === actions.payload.product._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += actions.payload.quantity;
      } else {
        state.cartItems.push(actions.payload);
      }
    },
    removeCartProduct: (state, actions) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === actions.payload.product._id
      );

      state.cartItems.splice(itemIndex, 1);
      if (state.cartItems.length === 0) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
    },
    minusOneItem: (state, actions) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === actions.payload.product._id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else {
        state.cartItems.splice(itemIndex, 1);
      }
      if (state.cartItems.length === 0) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
    },
  },
});

export const {
  getProductsStart,
  getProductsFailure,
  getProductsSuccess,
  loadingDebounce,
  finishLoadingDebounce,
  getCartProduct,
  addToCart,
  removeCartProduct,
  minusOneItem,
} = productSlice.actions;
export default productSlice.reducer;
