import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  loadProductsBySearch,
  selectProducts,
} from "../../store/products/productsSlice";
import CatalogPage from "../templates/CatalogPage/CatalogPage";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProductsBySearch({ page: 1, query }));
  }, [dispatch, query]);

  const { items, page, totalPages } = useAppSelector(selectProducts);

  const handleChange = (page: number) => {
    dispatch(loadProductsBySearch({ page, query }));
  };

  return (
    <CatalogPage
      title={`Search: ${query}`}
      products={items}
      currentPage={page}
      totalPages={totalPages}
      handleChange={handleChange}
    />
  );
};

export default SearchPage;
