import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { loadProducts, selectProducts } from "./productsSlice";

export const useProductsList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProducts({ page: 1 }));
  }, [dispatch]);

  const products = useAppSelector(selectProducts);

  return products;
};
