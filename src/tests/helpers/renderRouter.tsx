import {
  createMemoryRouter,
  RouterProvider,
  type InitialEntry,
} from "react-router";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import CheckoutPage from "../../pages/CheckoutPage/CheckoutPage";
import HomePage from "../../pages/HomePage/HomePage";
import MainLayout from "../../pages/layouts/MainLayout";
import NotFound from "../../pages/NotFound/NotFound";
import ProductPage from "../../pages/ProductPage/ProductPage";
import SearchPage from "../../pages/SearchPage/SearchPage";

export const renderRouter = (initialEntries: InitialEntry[]) => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/:category",
            element: <CategoryPage />,
          },
          {
            path: "/product/:id",
            element: <ProductPage />,
          },
          { path: "/search", element: <SearchPage /> },
          {
            path: "/checkout",
            element: <CheckoutPage />,
          },
        ],
        errorElement: <NotFound />,
      },
    ],
    { initialEntries }
  );

  return <RouterProvider router={router} />;
};
