import { configureStore } from "@reduxjs/toolkit";
import { createPromise } from "redux-promise-middleware";

import newsReducer from "./newsSlice";

const promiseMiddleware = createPromise();

const store = configureStore({
  reducer: {
    news: newsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(promiseMiddleware)
});

export default store;