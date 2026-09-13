import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",

  initialState: {
    items: [
      {
        id: 1,
        name: "Pizza",
        category: "Fast Food",
        price: 250
      },
      {
        id: 2,
        name: "Burger",
        category: "Fast Food",
        price: 150
      },
      {
        id: 3,
        name: "Pasta",
        category: "Italian",
        price: 200
      }
    ]
  },

  reducers: {
    addFood: (state, action) => {
      state.items.push(action.payload);
    },

    removeFood: (state, action) => {
      state.items = state.items.filter(
        (food) => food.id !== action.payload
      );
    }
  }
});

export const { addFood, removeFood } = foodSlice.actions;

export default foodSlice.reducer;