import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import type { CartItem } from "../../types";
import {
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
  selectAllCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from "./cartSlice";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const items = useAppSelector(selectAllCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const handleIncreaseItemQuantity = (itemId: CartItem["id"]) => () => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseItemQuantity = (itemId: CartItem["id"]) => () => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const handleRemoveItem = (itemId: CartItem["id"]) => () => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return {
    items,
    totalQuantity,
    totalPrice,
    increaseItemQuantity: handleIncreaseItemQuantity,
    decreaseItemQuantity: handleDecreaseItemQuantity,
    removeItem: handleRemoveItem,
    clearCart: handleClear,
  } as const;
};
