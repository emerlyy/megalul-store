import { useCart } from "../../store/cart/useCart";
import Text from "../../ui/Text/Text";
import Title from "../../ui/Title/Title";
import { formatPrice } from "../../utils/formatPrice";
import "./Summary.css";

const SHIPPING_COST = 50;

const Summary = () => {
  const { items, totalQuantity, totalPrice } = useCart();

  const grandTotal = totalPrice + SHIPPING_COST;

  return (
    <div className="summary">
      <Title tag="h2" size="small" weight="semibold" className="summary__title">
        SUMMARY
      </Title>
      <div className="summary-list">
        {totalQuantity > 0 ? (
          items.map((item) => (
            <div className="summary-item">
              <div className="summary-item__image-wrapper">
                <img
                  className="summary-item__image"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className="summary-item__content">
                <div>
                  <Text
                    tag="strong"
                    className="summary-item__name"
                    weight="semibold"
                  >
                    {item.name}
                  </Text>
                  <Text tag="span" className="summary-item__price">
                    ${formatPrice(item.price)}
                  </Text>
                </div>
                <Text tag="span" className="summary-item__quantity">
                  x{item.quantity}
                </Text>
              </div>
            </div>
          ))
        ) : (
          <Text className="summary__message-empty" size="large" color="light">
            Cart is empty
          </Text>
        )}
      </div>
      <div>
        <div className="summary__totals">
          <Text tag="span">TOTAL</Text>
          <Text className="summary__price" weight="semibold">
            ${formatPrice(totalPrice)}
          </Text>
        </div>
        <div className="summary__totals">
          <Text tag="span">SHIPPING</Text>
          <Text className="summary__price" weight="semibold">
            $50
          </Text>
        </div>

        <div className="summary__totals summary__grand-total">
          <Text tag="span">GRAND TOTAL</Text>
          <Text className="summary__price" color="primary" weight="semibold">
            ${formatPrice(grandTotal)}
          </Text>
        </div>
      </div>
      <button
        role="button"
        className="summary__checkout"
        form="checkout-form"
        disabled={!totalQuantity}
      >
        Continue & Pay
      </button>
    </div>
  );
};

export default Summary;
