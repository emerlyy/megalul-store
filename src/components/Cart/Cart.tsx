import { useEffect, useRef } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { Link } from "react-router";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useToggle } from "../../hooks/useToggle";
import { useCart } from "../../store/cart/useCart";
import { formatPrice } from "../../utils/formatPrice";
import CartItem from "../CartItem/CartItem";
import Text from "../ui/Text/Text";
import Title from "../ui/Title/Title";
import "./Cart.css";

const Cart = () => {
  const [isCartOpen, , openCart, closeCart] = useToggle(false);

  const {
    totalQuantity,
    items,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
    clearCart,
    totalPrice,
  } = useCart();

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, closeCart, isCartOpen);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }
  }, [isCartOpen]);

  return (
    <div className="cart-wrapper">
      <button onClick={openCart} className="cart__button">
        <PiShoppingCart className="cart__icon" />
        {totalQuantity > 0 && (
          <div className="cart__quantity-indicator">{totalQuantity}</div>
        )}
      </button>
      {isCartOpen && (
        <>
          <div ref={ref} className="cart-body">
            {totalQuantity > 0 ? (
              <>
                <div className="cart__header">
                  <Title tag="h2" size="small">
                    Cart ({totalQuantity})
                  </Title>
                  <button className="cart__clear-button" onClick={clearCart}>
                    Remove all
                  </button>
                </div>
                <div className="cart__list">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.id}`}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      quantity={item.quantity}
                      onDecrease={decreaseItemQuantity(item.id)}
                      onIncrease={increaseItemQuantity(item.id)}
                      onRemove={removeItem(item.id)}
                    />
                  ))}
                </div>
                <div className="cart__total-wrapper">
                  <Text color="light" weight="medium">
                    TOTAL
                  </Text>
                  <Title tag="span" size="small" className="cart__total-price">
                    ${formatPrice(totalPrice)}
                  </Title>
                </div>
                <Link to="/checkout" className="cart__checkout" reloadDocument>
                  Checkout
                </Link>
              </>
            ) : (
              <Text className="cart__empty-message" tag="p" color="light">
                Cart is empty
              </Text>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
