import { createStore, applyMiddleware } from "redux";
import counterReducer from "./counterReducer";

const logger = (store) => (next) => (action) => {
  console.log("Previous State:", store.getState());

  console.log("Action:", action);

  const result = next(action);

  console.log("Next State:", store.getState());

  return result;
};

const store = createStore(
  counterReducer,
  applyMiddleware(logger)
);

export default store;