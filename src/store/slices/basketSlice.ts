import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: localStorage.getItem("basket")
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("basket"))
      : [],
    totalQuantity: 0,
    totalAmount: 0
  },
  reducers: {
    addToBasket: (state: any, action) => {
      let control = state.basket.some(
        (item: any) => item.id === action.payload.id
      );

      if (control) {
        state.basket = state.basket.map((item: any) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        state.basket = [...state.basket, { ...action.payload, quantity: 1 }];
      }
      //Accumlate total quantity
      state.totalQuantity = state.basket.reduce(
        (total: number, item: any) => (total += item.quantity),
        0
      );
      //Accumalate total price
      state.totalAmount = state.basket.reduce(
        (total: number, item: any) => (total += item.price * item.quantity),
        0
      );
      //Set localStorage
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },

    removeFromBasket: (state: any, action) => {
      state.basket = state.basket.filter(
        (item: any) => item.id !== action.payload
      );
      state.totalQuantity = state.basket.reduce(
        (total: number, item: any) => (total += item.quantity),
        0
      );
      state.totalAmount = state.basket.reduce(
        (total: number, item: any) => (total += item.price * item.quantity),
        0
      );

      //set localStorage
      localStorage.setItem("basket", JSON.stringify(state.basket));
    }
  }
});
export default basketSlice.reducer;
export const { addToBasket, removeFromBasket } = basketSlice.actions;
