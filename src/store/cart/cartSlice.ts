import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { CartItem } from "../../types";
import { loadCart } from "../../utils/localStorage";

export type CartState = {
  items: CartItem[];
  totalQuantity: number;
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const getTotalQuantity = (items: CartItem[]): number => {
  return items.length;
};

const savedCart = loadCart();

const cartSlice = createSlice({
  name: "@@cart",
  initialState: savedCart ? savedCart : initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existedItem = state.items.find(
        (item) => action.payload.id === item.id
      );

      if (existedItem) {
        existedItem.quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
        state.totalQuantity = getTotalQuantity(state.items);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<CartItem["id"]>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalQuantity = getTotalQuantity(state.items);
    },
    increaseItemQuantity: (state, action: PayloadAction<CartItem["id"]>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      state.totalQuantity = getTotalQuantity(state.items);
    },
    decreaseItemQuantity: (state, action: PayloadAction<CartItem["id"]>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        state.items = state.items.filter((item) => item.quantity > 0);
      }
      state.totalQuantity = getTotalQuantity(state.items);
    },
    clearCart: () => initialState,
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const selectAllCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.totalQuantity;

export const selectCartTotalPrice = (state: RootState) => {
  return state.cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
};

const cartReducer = cartSlice.reducer;

export default cartReducer;
