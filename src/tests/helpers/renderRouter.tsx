import { createRoutesStub, type InitialEntry } from "react-router";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import CheckoutPage from "../../pages/CheckoutPage/CheckoutPage";
import HomePage from "../../pages/HomePage/HomePage";
import MainLayout from "../../pages/layouts/MainLayout";
import NotFound from "../../pages/NotFound/NotFound";
import ProductPage from "../../pages/ProductPage/ProductPage";
import SearchPage from "../../pages/SearchPage/SearchPage";

const Stub = createRoutesStub([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: ":category",
        Component: CategoryPage,
      },
      {
        path: "product/:id",
        Component: ProductPage,
      },
      { path: "search", Component: SearchPage },
      {
        path: "checkout",
        Component: CheckoutPage,
      },
    ],
  },
  { path: "*", Component: NotFound },
]);

export const renderRouter = (initialEntries: InitialEntry[]) => {
  return <Stub initialEntries={initialEntries} />;
};
