import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { client } from "../../api/client";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import type { FetchStatus, Product } from "../../types";

type Params = {
  id: string;
};

type FetchProduct = {
  product: Product | null;
  status: FetchStatus;
  error: null | string;
};

const ProductPage = () => {
  const { id: productId } = useParams<Params>();

  const [response, setResponse] = useState<FetchProduct>({
    product: null,
    status: "loading",
    error: null,
  });

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async (): Promise<void> => {
      setResponse({ product: null, status: "loading", error: null });
      try {
        const product = await client.getProductDetails(productId!);

        if (isSubscribed) {
          setResponse({ product, status: "fulfilled", error: null });
        }
      } catch (error) {
        if (isSubscribed && error instanceof Error) {
          setResponse({
            product: null,
            status: "rejected",
            error: error.message,
          });
          console.error(error.name + "---" + error.message);
        }
      }
    };

    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, [productId]);

  if (response.status === "loading") {
    return <>Loading</>;
  }
  if (!response.product) return;

  return (
    <div className="product-page container">
      <ProductDetails product={response.product} />
    </div>
  );
};

export default ProductPage;
