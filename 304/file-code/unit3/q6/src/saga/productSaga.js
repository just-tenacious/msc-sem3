import { call, put, takeLatest } from "redux-saga/effects";

import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure
} from "../redux/productSlice";

const fetchProductsAPI = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        const productData = [
          {
            id: 1,
            name: "Laptop",
            price: 55000
          },
          {
            id: 2,
            name: "Smartphone",
            price: 25000
          },
          {
            id: 3,
            name: "Headphones",
            price: 3000
          },
          {
            id: 4,
            name: "Keyboard",
            price: 1500
          }
        ];

        resolve(productData);
      } else {
        reject(new Error("Failed to fetch products"));
      }
    }, 2000);
  });
};

function* fetchProductsSaga() {
  try {
    const products = yield call(fetchProductsAPI);

    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* productSaga() {
  yield takeLatest(fetchProducts.type, fetchProductsSaga);
}

export default productSaga;