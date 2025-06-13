import Pagination from "../../../components/Pagination/Pagination";
import ProductsList from "../../../components/ProductsList/ProductsList";
import type { Product } from "../../../types";
import Title from "../../../ui/Title/Title";
import "./CatalogPage.css";

type Props = {
  title: string;
  products: Product[];
  currentPage: number;
  totalPages: number;
  handleChange: (page: number) => void;
};

const CatalogPage = ({
  title,
  products,
  currentPage,
  totalPages,
  handleChange,
}: Props) => {
  return (
    <section className="catalog">
      <div className="container catalog__body">
        <div>
          <Title className="catalog__title" size="large">
            {title}
          </Title>
          <ProductsList products={products} className="catalog__list" />
        </div>
        <Pagination
          className="catalog__pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

export default CatalogPage;
