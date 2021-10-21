import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import productDetailReducer from "./productDetailSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import cityReducer from "./citySlice";
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    user: userReducer,
    city: cityReducer,
    order: orderReducer,
  },
});

export default store;
