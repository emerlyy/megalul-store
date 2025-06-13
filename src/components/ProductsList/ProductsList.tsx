import clsx from "clsx";
import type { Product } from "../../types";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";

type Props = {
  products: Product[];
  className?: string;
};

const ProductsList = ({ products, className }: Props) => {
  return (
    <div className={clsx("products-list", className)}>
      {products.map((item) => (
        <ProductCard
          key={item.id}
          {...item}
          reviewCount={item.reviews.length}
        />
      ))}
    </div>
  );
};

export default ProductsList;
