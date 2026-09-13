import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },

    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );
    }
  }
});

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  addToCart,
  removeFromCart
} = productSlice.actions;

export default productSlice.reducer;