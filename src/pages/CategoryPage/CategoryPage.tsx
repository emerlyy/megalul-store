import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectCategories } from "../../store/categories/categoriesSlice";
import {
  loadProductsByCategory,
  selectProducts,
} from "../../store/products/productsSlice";
import { formatKebabCase } from "../../utils/formatKebabCase";
import CatalogPage from "../templates/CatalogPage/CatalogPage";

type Params = {
  category: string;
};

const CategoryPage = () => {
  const { category = "" } = useParams<Params>();

  const dispatch = useAppDispatch();

  const { items: loadedCategories } = useAppSelector(selectCategories);
  const { items, page, totalPages } = useAppSelector(selectProducts);

  const handleChange = (page: number) => {
    if (category) dispatch(loadProductsByCategory({ category, page }));
  };

  useEffect(() => {
    if (category) dispatch(loadProductsByCategory({ page: 1, category }));
  }, [dispatch, category]);

  if (!loadedCategories.some((item) => item.slug === category)) {
    throw new Response("Not Found", { status: 404 });
  }

  return (
    <CatalogPage
      title={formatKebabCase(category)}
      products={items}
      currentPage={page}
      totalPages={totalPages}
      handleChange={handleChange}
    />
  );
};

export default CategoryPage;
