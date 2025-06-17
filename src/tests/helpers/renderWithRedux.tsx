import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import type { RootState } from "../../store";
import cartReducer from "../../store/cart/cartSlice";
import categoriesReducer from "../../store/categories/categoriesSlice";
import productsReducer from "../../store/products/productsSlice";

export const renderWithRedux = (
  component: React.ReactNode,
  initialState: RootState
) => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      categories: categoriesReducer,
      cart: cartReducer,
    },
    preloadedState: initialState,
  });

  return render(<Provider store={store}>{component}</Provider>);
};
