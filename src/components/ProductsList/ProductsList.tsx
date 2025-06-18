import clsx from "clsx";
import ProductCard, { type ProductCardProps } from "../ProductCard/ProductCard";
import "./ProductsList.css";

type Props = {
  products: ProductCardProps[];
  className?: string;
};

const ProductsList = ({ products, className }: Props) => {
  return (
    <div
      className={clsx("products-list", className)}
      data-testid="products-list"
    >
      {products.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ProductsList;
