import type { CartState } from "../store/cart/cartSlice";


export const saveCart = (cart: CartState) => {
  const serializedCart = JSON.stringify(cart);
  localStorage.setItem("cart", serializedCart);
};

export const loadCart = (): CartState | undefined => {
  const serializedCart = localStorage.getItem("cart");
  if (serializedCart) {
    return JSON.parse(serializedCart);
  }
};
