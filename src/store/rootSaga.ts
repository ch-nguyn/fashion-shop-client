import { all } from "redux-saga/effects";
import productSaga from "../features/saga/productSaga";
import userSaga from "../features/saga/userSaga";

export default function* rootSaga() {
  yield all([productSaga(), userSaga()]);
}
