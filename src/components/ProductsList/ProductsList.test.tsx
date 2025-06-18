// ProductsList.test.tsx
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { RootState } from "../../store";
import { renderWithRedux } from "../../tests/helpers/renderWithRedux";
import { renderWithRouter } from "../../tests/helpers/renderWithRouter";
import type { ProductCardProps } from "../ProductCard/ProductCard";
import ProductsList from "./ProductsList";

const initialState: RootState = {
  cart: {
    items: [],
    totalQuantity: 0,
  },
  categories: {
    status: "idle",
    items: [],
    error: null,
  },
  products: {
    error: null,
    items: [],
    page: 1,
    status: "idle",
    totalPages: 1,
  },
};

const mockProducts: ProductCardProps[] = [
  {
    id: "1",
    title: "Product 1",
    price: 100,
    rating: 4.5,
    thumbnail: "image1.jpg",
    category: "electronics",
  },
  {
    id: "2",
    title: "Product 2",
    price: 200,
    rating: 4.8,
    thumbnail: "image2.jpg",
    category: "furniture",
  },
  {
    id: "3",
    title: "Product 3",
    price: 300,
    rating: 2.8,
    thumbnail: "image3.jpg",
    category: "furniture",
  },
];

describe("ProductsList", () => {
  it("Renders a list of ProductCard components", () => {
    renderWithRedux(
      renderWithRouter(<ProductsList products={mockProducts} />),
      initialState
    );
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();
  });

  it("Applies additional className if provided", () => {
    renderWithRedux(
      renderWithRouter(
        <ProductsList className="custom-class" products={mockProducts} />
      ),
      initialState
    );
    const container = screen.getByTestId("products-list");
    expect(container).toHaveClass("products-list");
    expect(container).toHaveClass("custom-class");
  });
});
