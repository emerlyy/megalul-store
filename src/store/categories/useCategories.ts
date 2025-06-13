import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { loadCategories, selectCategories } from "./categoriesSlice";

export const useCategories = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const categories = useAppSelector(selectCategories);

  return categories;
};
