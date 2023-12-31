import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import productApi from "../../api/modules/productApi";
import {
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
} from "../slice/productSlice";

function* getProducts() {
  try {
    const res: AxiosResponse = yield call(productApi.getAllProducts);
    yield put(getProductsSuccess(res.data.products));
  } catch (error) {
    yield put(getProductsFailure());
  }
}

function* productSaga() {
  yield takeEvery(getProductsStart, getProducts);
}

export default productSaga;
