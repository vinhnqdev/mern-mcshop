import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import productDetailReducer from "./productDetailSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
