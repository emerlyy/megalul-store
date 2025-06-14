import { useAppDispatch } from "../../hooks/reduxHooks";
import { useCounter } from "../../hooks/useCounter";
import { addItemToCart } from "../../store/cart/cartSlice";
import type { Product } from "../../types";
import Text from "../../ui/Text/Text";
import Title from "../../ui/Title/Title";
import { formatKebabCase } from "../../utils/formatKebabCase";
import { formatPrice } from "../../utils/formatPrice";
import Counter from "../Counter/Counter";
import GoBackButton from "../GoBackButton/GoBackButton";
import ImageViewer from "../ImageViewer/ImageViewer";
import "./ProductDetails.css";

type Props = {
  product: Product;
};

const ProductDetails = ({ product }: Props) => {
  const [count, increment, decrement] = useCounter();

  const dispatch = useAppDispatch();

  const handleAddToCard = () => {
    dispatch(
      addItemToCart({
        id: product.id,
        image: product.thumbnail,
        price: product.price,
        quantity: count,
        name: product.title,
      })
    );
  };

  return (
    <div className="product-details__wrapper">
      <GoBackButton className="product-details__back" />
      <div className="product-details">
        <div className="product-details__images">
          <ImageViewer images={product.images} />
        </div>
        <div className="product-details__content">
          <Text
            size="large"
            color="text-primary"
            weight="semibold"
            className="product-details__category"
          >
            {formatKebabCase(product.category)}
          </Text>
          <Title
            tag="h2"
            size="xl"
            weight="bold"
            color="primary"
            className="product-details__title"
          >
            {product.title}
          </Title>
          <Text
            tag="p"
            size="regular"
            color="light"
            className="product-details__description"
          >
            {product.description}
          </Text>
          <Text
            size="xl"
            color="text-primary"
            weight="bold"
            className="product-details__price"
          >
            ${formatPrice(product.price)}
          </Text>
          <div className="product-details__actions">
            <Counter
              value={count}
              increment={increment}
              decrement={decrement}
            />
            <button
              className="product-details__button"
              onClick={handleAddToCard}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
