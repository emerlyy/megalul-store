import { useAppSelector } from "../../hooks/reduxHooks";
import { selectProductDetails } from "./productsSlice";

export const useProductDetails = (productId: string) => {
  const productDetails = useAppSelector((state) =>
    selectProductDetails(state, productId)
  );

  return productDetails;
};
