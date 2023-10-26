import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import productApi from "../../api/modules/productApi";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
} from "../slice/userSlice";
import userApi from "../../api/modules/userApi";

function* getUser() {
  try {
    const res: AxiosResponse = yield call(userApi.getMe);
    yield put(getUserSuccess(res.data.user));
  } catch (error) {
    yield put(getUserFailure());
  }
}

function* userSaga() {
  yield takeEvery(getUserStart, getUser);
}

export default userSaga;
