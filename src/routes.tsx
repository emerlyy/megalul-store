import { createBrowserRouter } from "react-router";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import HomePage from "./pages/HomePage/HomePage";
import MainLayout from "./pages/layouts/MainLayout";
import ProductPage from "./pages/ProductPage/ProductPage";
import SearchPage from "./pages/SearchPage/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: ":category",
        element: <CategoryPage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      { path: "search", element: <SearchPage /> },

      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
    errorElement: <>Page not found</>,
  },
]);
