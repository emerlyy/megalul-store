import { configureStore } from "@reduxjs/toolkit";
import { client } from "./api/client";
import cartReducer from "./store/cart/cartSlice";
import categoriesReducer from "./store/categories/categoriesSlice";
import productsReducer from "./store/products/productsSlice";
import { saveCart } from "./utils/localStorage";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { api: client } },
    }),
});

store.subscribe(() => {
  saveCart(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
