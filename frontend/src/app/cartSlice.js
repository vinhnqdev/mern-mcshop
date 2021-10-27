import { createSlice } from "@reduxjs/toolkit";

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: initialCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const addedItemIndex = state.cart.findIndex((item) => item._id === action.payload._id);
      if (addedItemIndex === -1) {
        state.cart.push({ ...action.payload, quantity: 1 });
      } else {
        state.cart[addedItemIndex].quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addToCartWithNumberForm: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload._id);
      if (!item) return;
      item.quantity = action.payload.quantity;
    },
    removeToCart: (state, action) => {
      const _id = action.payload._id;

      const item = state.cart.find((item) => item._id === _id);

      if (item.quantity === 1) {
        const newCart = state.cart.filter((item) => item._id !== _id);
        state.cart = newCart;
      }
      item.quantity--;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearItem: (state, action) => {
      const _id = action.payload;
      const index = state.cart.findIndex((item) => item._id === _id);
      if (index !== -1) {
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    clearCart: (state) => {
      localStorage.removeItem("cart");
      state.cart = [];
    },
  },
});

export const cartActions = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
