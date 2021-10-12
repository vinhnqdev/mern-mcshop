import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import productDetailReducer from "./productDetailSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
  },
});

export default store;
