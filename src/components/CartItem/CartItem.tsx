import clsx from "clsx";
import { BiX } from "react-icons/bi";
import { formatPrice } from "../../utils/formatPrice";
import Counter from "../Counter/Counter";
import Text from "../ui/Text/Text";
import "./CartItem.css";

type Props = {
  name: string;
  image: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const CartItem = ({
  name,
  image,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) => {
  return (
    <div className={clsx("cart-item")}>
      <div className="cart-item__image-wrapper">
        <img className="cart-item__image" src={image} alt={name} />
      </div>
      <div className="cart-item__body">
        <div>
          <Text tag="strong" className="cart-item__name" weight="bold">
            {name}
          </Text>
          <Text tag="span" className="cart-item__price" color="light">
            ${formatPrice(price)}
          </Text>
        </div>
        <div className="cart-item__actions">
          <Counter
            className="cart-item__counter"
            size="small"
            value={quantity}
            decrement={onDecrease}
            increment={onIncrease}
          />
          <button className="cart-item__remove" onClick={onRemove}>
            <BiX />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
