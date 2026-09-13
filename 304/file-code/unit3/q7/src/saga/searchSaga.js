import { call, put, takeLatest } from "redux-saga/effects";

import {
  searchProducts,
  searchProductsSuccess,
  searchProductsFailure
} from "../redux/searchSlice";

const searchProductsAPI = (searchTerm) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const products = [
        {
          id: 1,
          name: "Laptop",
          price: 55000
        },
        {
          id: 2,
          name: "Laptop Bag",
          price: 2000
        },
        {
          id: 3,
          name: "Smartphone",
          price: 25000
        },
        {
          id: 4,
          name: "Headphones",
          price: 3000
        },
        {
          id: 5,
          name: "Keyboard",
          price: 1500
        },
        {
          id: 6,
          name: "Gaming Mouse",
          price: 1200
        }
      ];

      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const success = true;

      if (success) {
        resolve(results);
      } else {
        reject(new Error("Failed to search products"));
      }
    }, 1500);
  });
};

function* searchProductsSaga(action) {
  try {
    const products = yield call(
      searchProductsAPI,
      action.payload
    );

    yield put(searchProductsSuccess(products));
  } catch (error) {
    yield put(searchProductsFailure(error.message));
  }
}

function* searchSaga() {
  yield takeLatest(
    searchProducts.type,
    searchProductsSaga
  );
}

export default searchSaga;