import { useAppDispatch } from "../../hooks/reduxHooks";
import { useCounter } from "../../hooks/useCounter";
import { addItemToCart } from "../../store/cart/cartSlice";
import type { Product } from "../../types";
import { formatKebabCase } from "../../utils/formatKebabCase";
import { formatPrice } from "../../utils/formatPrice";
import Counter from "../Counter/Counter";
import GoBackButton from "../GoBackButton/GoBackButton";
import ImageViewer from "../ImageViewer/ImageViewer";
import Text from "../ui/Text/Text";
import Title from "../ui/Title/Title";
import "./ProductDetails.css";

type Props = Pick<
  Product,
  "id" | "thumbnail" | "price" | "title" | "images" | "description" | "category"
>;

const ProductDetails = ({
  id,
  price,
  thumbnail,
  title,
  images,
  description,
  category,
}: Props) => {
  const [count, increment, decrement] = useCounter();

  const dispatch = useAppDispatch();

  const handleAddToCard = () => {
    dispatch(
      addItemToCart({
        id: id,
        image: thumbnail,
        price: price,
        quantity: count,
        name: title,
      })
    );
  };

  return (
    <div className="product-details__wrapper">
      <GoBackButton className="product-details__back" />
      <div className="product-details">
        <div className="product-details__images">
          <ImageViewer images={images} />
        </div>
        <div className="product-details__content">
          <Text
            size="large"
            color="text-primary"
            weight="semibold"
            className="product-details__category"
          >
            {formatKebabCase(category)}
          </Text>
          <Title
            tag="h2"
            size="xl"
            weight="bold"
            color="primary"
            className="product-details__title"
          >
            {title}
          </Title>
          <Text
            tag="p"
            size="regular"
            color="light"
            className="product-details__description"
          >
            {description}
          </Text>
          <Text
            size="xl"
            color="text-primary"
            weight="bold"
            className="product-details__price"
          >
            ${formatPrice(price)}
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
