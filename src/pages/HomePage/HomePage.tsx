import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  loadProducts,
  selectProducts,
} from "../../store/products/productsSlice";
import CatalogPage from "../templates/CatalogPage/CatalogPage";

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProducts({ page: 1 }));
  }, [dispatch]);

  const { items, page, totalPages } = useAppSelector(selectProducts);

  const handleChange = (page: number) => {
    dispatch(loadProducts({ page }));
  };

  return (
    <CatalogPage
      title="All Products"
      products={items}
      currentPage={page}
      totalPages={totalPages}
      handleChange={handleChange}
    />
  );
};

export default HomePage;
