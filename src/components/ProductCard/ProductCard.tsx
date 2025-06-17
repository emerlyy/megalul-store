import { IoStar } from "react-icons/io5";
import { Link } from "react-router";
import type { Product } from "../../types";
import { formatKebabCase } from "../../utils/formatKebabCase";
import { formatPrice } from "../../utils/formatPrice";
import Text from "../ui/Text/Text";
import Title from "../ui/Title/Title";
import "./ProductCard.css";

export type ProductCardProps = Pick<
  Product,
  "id" | "title" | "price" | "rating" | "thumbnail" | "category"
>;

const ProductCard = ({
  id,
  title,
  price,
  rating,
  thumbnail,
  category,
}: ProductCardProps) => {
  return (
    <Link className="product-card" to={`/product/${id}`}>
      <div className="product-card__image">
        <img src={thumbnail} alt={title} width={200} height={200} />
      </div>
      <div className="product-card__body">
        <Title tag="h2" size="small" className="product-card__title">
          {title}
        </Title>
        <div className="product-card__footer">
          <Text className="product-card__rating">
            {Math.floor(rating)}
            <IoStar className="product-card__rating-icon" />
          </Text>
          <Text tag="h3" size="regular" className="product-card__category">
            {formatKebabCase(category)}
          </Text>
          <Text size="large" color="primary" weight="semibold">
            ${formatPrice(price)}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
